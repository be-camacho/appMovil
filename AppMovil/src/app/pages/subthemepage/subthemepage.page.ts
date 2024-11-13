import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  isActiveModal: boolean = false; // Variable para controlar la apertura y cierre del modal

  selecteStudyTheme: StudyThemeI;

  namein: string;// variable para guardar el nombre del tema a editar

  uid: string;// variable para guardar el id de el usuario actual
  tid: string;// variable para guardar el id del tema a editar
  sid: string;// variable para guardar el id del subtema a editar
  theme:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder
  ) {
    this.themeForm = this.formBuilder.group({
      subThemeName: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.loadSubThemes();

    this.route.params.subscribe(params => { // cambiar manera de enviarlos con la que se uso en el new question round es mas efectiva
      if (params['item']) {
        this.selecteStudyTheme = JSON.parse(params['item']);
        this.tid = this.selecteStudyTheme.id;
      }
    });
  }

  async loadSubThemes() {
    const currentUser = await this.authService.getProfile();
    this.uid = currentUser.uid;
    this.firebaseService.getCollectionChanges<SubthemeI>(`Users/${this.uid}/studythemes/${this.tid}/subthemes`).subscribe((data) => {
      if (data) {
        this.subthemes = data;
      }
    });
  }

  async deleteSubTheme(subTheme: SubthemeI) {
    const currentUser = await this.authService.getProfile();
    const uid = currentUser.uid;
    const tuid = this.selecteStudyTheme.id;
    this.firebaseService.deleteDocumentID(`Users/${uid}/studythemes/${tuid}/subthemes`, subTheme.id);
  }

  onItemClick(item: SubthemeI) {
    if (this.editMode) {
      this.namein = item.subtname;
      this.sid = item.id;
      this.openModal();
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
  async openModal() {
    this.isActiveModal = true;
  }
  async closeModal() {
    this.isActiveModal = false;
  }
}
