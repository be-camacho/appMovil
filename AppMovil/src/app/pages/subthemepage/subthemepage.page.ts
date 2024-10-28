import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ThememodalComponent } from 'src/app/components/thememodal/thememodal.component';
import { StudyThemeI } from 'src/app/models/studytheme.models';
import { SubthemeI } from 'src/app/models/subtheme.models';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-subthemepage',
  templateUrl: './subthemepage.page.html',
  styleUrls: ['./subthemepage.page.scss'],
})
export class SubthemepagePage implements OnInit {

  newStudyTheme: SubthemeI;
  subthemes: SubthemeI[] = [];
  themeForm: FormGroup;
  loading: boolean = false;
  editMode: boolean = false;
  deletMode: boolean = false;
  selecteStudyTheme: StudyThemeI;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private modalController: ModalController, 
    private formBuilder: FormBuilder
  ) {
    this.themeForm = this.formBuilder.group({
      subThemeName: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.loadSubThemes();
    this.route.params.subscribe(params => {
      if (params['item']) {
        this.selecteStudyTheme = JSON.parse(params['item']);
        console.log('Received item:', this.selecteStudyTheme);
      }
    });
  }

  async loadSubThemes() {
    const currentUser = await this.authService.getProfile();
    const tuid = this.selecteStudyTheme.id;
    const uid = currentUser.uid;
    this.firebaseService.getCollectionChanges<SubthemeI>(`Users/${uid}/studythemes/${tuid}/subthemes`).subscribe((data) => {
      if (data) {
        this.subthemes = data;
      }
    });
  }

  async openAddSubThemeModal() {
    const modal = await this.modalController.create({
      component: ThememodalComponent,
      componentProps: {
        title: 'Crear una Unidad para ' + this.selecteStudyTheme.tname,
        buttonText: 'Crear',
        inputname: 'Nombre de la Unidad',
        themeName: ''
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.addSubTheme(data.data.themeName);
      }
    });
    return await modal.present();
  }
  
  async openEditSubThemeModal(subTheme: SubthemeI) {
    const modal = await this.modalController.create({
      component: ThememodalComponent,
      componentProps: {
        title: 'Modificar Unidad de ' + this.selecteStudyTheme.tname,
        buttonText: 'Guardar cambios',
        inputname: 'Nombre de la Unidad',
        themeName: subTheme.subtname
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.updateSubTheme(subTheme.id, data.data.themeName);
      }
    });
    return await modal.present();
  }

  async updateSubTheme(id: string, subThemeName: string) {
    const currentUser = await this.authService.getProfile();
    if (currentUser) {
      const uid = currentUser.uid;
      const tuid = this.selecteStudyTheme.id;
      const updatedSubTheme: SubthemeI = {
        id: id,
        subtname: subThemeName
      };
      await this.firebaseService.createDocumentID(updatedSubTheme, `Users/${uid}/studythemes/${tuid}/subthemes`, updatedSubTheme.id);
    }
  }

  async addSubTheme(subThemeName: string) {
    if (subThemeName) {
      const currentUser = await this.authService.getProfile();
      console.log('Current user:', currentUser);
      if (currentUser) {
        const uid = currentUser.uid;
        const tuid = this.selecteStudyTheme.id;
        const newTheme: SubthemeI = {
          id: this.firebaseService.createIdDoc(),
          subtname: subThemeName
        };
        await this.firebaseService.createDocumentID(newTheme, `Users/${uid}/studythemes/${tuid}/subthemes`, newTheme.id);
        this.subthemes.push(newTheme);
      }
    }
  }
  async deleteSubTheme(subTheme: SubthemeI) {
    const currentUser = await this.authService.getProfile();
    const uid = currentUser.uid;
    const tuid = this.selecteStudyTheme.id;
    this.firebaseService.deleteDocumentID(`Users/${uid}/studythemes/${tuid}/subthemes`, subTheme.id);
  }
  onItemClick(item: SubthemeI) {
    if (this.editMode) {
      this.openEditSubThemeModal(item);
    } else if (this.deletMode) {
      this.deleteSubTheme(item);
    } else {
      this.router.navigate(['/questionpage',{ 
        subTheme: JSON.stringify(item) ,
        studyTheme: JSON.stringify(this.selecteStudyTheme) 
      }]);
    }
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.deletMode = false; // Desactiva el modo de eliminación si el modo de edición está activo
    }
  }
  toggleDeletMode() {
    this.deletMode = !this.deletMode;
    if (this.deletMode) {
      this.editMode = false; // Desactiva el modo de edición si el modo de eliminación está activo
    }
  }
}
