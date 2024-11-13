import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  editMode:boolean = false; // Variable para controlar el modo de edición
  deletMode: boolean = false; // Variable para controlar el modo de eliminación

  isActiveModal: boolean = false; // Variable para controlar la apertura y cierre del modal

  namein: string;// variable para guardar el nombre del tema a editar
  uid: string;// variable para guardar el id de el usuario actual
  tid: string;// variable para guardar el id del tema a editar

  theme:boolean = true;// variable para especificar que el modal es para un tema
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private firebaseService: FirebaseService,
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
    this.uid = currentUser.uid;
    this.firebaseService.getCollectionChanges<StudyThemeI>(`Users/${this.uid}/studythemes`).subscribe((data) => {
      if(data){
        this.studythemes = data;
      }
    });
  }

  async deleteTheme(theme: StudyThemeI) {
    this.firebaseService.deleteDocumentID(`Users/${this.uid}/studythemes`, theme.id);
  }

  onItemClick(item: StudyThemeI) {
    if(this.editMode){
      this.isActiveModal = true;
      this.namein = item.tname;
      this.tid = item.id;
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
  async openModal() {
    this.isActiveModal = true;
  }
  async closeModal() {
    this.isActiveModal = false;
  }

}


