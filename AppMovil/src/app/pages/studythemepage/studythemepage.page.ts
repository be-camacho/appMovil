import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ThememodalComponent } from 'src/app/components/thememodal/thememodal.component';
import { StudyThemeI } from 'src/app/models/studytheme.models';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-studythemepage',
  templateUrl: './studythemepage.page.html',
  styleUrls: ['./studythemepage.page.scss'],
})
export class StudythemepagePage implements OnInit {
  newStudyTheme: StudyThemeI;
  studythemes: StudyThemeI[] = [];
  themeForm: FormGroup;
  loading:boolean = false;
  editMode:boolean = false;
  deletMode: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private modalController: ModalController, 
    private formBuilder: FormBuilder){
      
      this.themeForm = this.formBuilder.group({
        themeName: ['', Validators.required]
      });
      
    };

  ngOnInit() {
    this.loadStudyThemes();
  }

  async loadStudyThemes() {
    const currentUser = await this.authService.getProfile();
    const uid = currentUser.uid;
    this.firebaseService.getCollectionChanges<StudyThemeI>(`Users/${uid}/studythemes`).subscribe((data) => {
      if(data){
        this.studythemes = data;
      }
    });
  }

  async openAddThemeModal() {
    const modal = await this.modalController.create({
      component: ThememodalComponent,
      componentProps: {
      title: 'Crear un nuevo Tema de Estudio',
      buttonText: 'Crear',
      inputname: 'Nombre del tema',
      themeName: ''
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.addTheme(data.data.themeName);
      }
    });
    return await modal.present();
  }
  async openEditThemeModal(theme: StudyThemeI) {
    const modal = await this.modalController.create({
      component: ThememodalComponent,
      cssClass: 'custom-modal',
      componentProps: {
        title: 'Modificar Tema de Estudio',
        buttonText: 'Guardar cambios',
        inputname: 'Nombre del tema',
        themeName: theme.tname
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.updateTheme(theme.id, data.data.themeName);
      }
    });
    return await modal.present();
  }
  async updateTheme(id: string, themeName: string) {
    const currentUser = await this.authService.getProfile();
    if (currentUser) {
      const uid = currentUser.uid;
      const updatedTheme: StudyThemeI = {
        id: id,
        tname: themeName
      };
      await this.firebaseService.createDocumentID(updatedTheme, `Users/${uid}/studythemes`, updatedTheme.id);
    }
  }
  
  async addTheme(themeName: string) {
    if (themeName) {
      const currentUser = await this.authService.getProfile();
      if(currentUser){
        const uid = currentUser.uid;
        const newTheme: StudyThemeI = {
          id: this.firebaseService.createIdDoc(),
          tname: themeName
        };
        await this.firebaseService.createDocumentID(newTheme, `Users/${uid}/studythemes`, newTheme.id);
        this.studythemes.push(newTheme);
      }
    }
  }
  async deleteTheme(theme: StudyThemeI) {
    const currentUser = await this.authService.getProfile();
    const uid = currentUser.uid;
    this.firebaseService.deleteDocumentID(`Users/${uid}/studythemes`, theme.id);
  }
  onItemClick(item: StudyThemeI) {
    if(this.editMode){
      this.openEditThemeModal(item);
    }else if(this.deletMode){
      this.deleteTheme(item);
    }else{
      this.router.navigate(['/subthemepage', { item: JSON.stringify(item) }]);
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

