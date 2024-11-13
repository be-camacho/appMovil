import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudyThemeI } from 'src/app/models/studytheme.models';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'theme-modal',
  templateUrl: './thememodal.component.html',
  styleUrls: ['./thememodal.component.scss'],
})
export class ThememodalComponent implements OnInit {
  @Input() nameInput: string;
  @Input() isEdit: boolean;
  @Input() uid: string;
  @Input() tid: string;
  @Input() istheme: boolean;
  @Output() closeModal = new EventEmitter<void>();
  nameform: FormGroup;
  inputname: string;
  buttontext: string;
  tittle: string;
  theme:boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    ) {

    this.nameform = this.formBuilder.group({
      Name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadconfig();
    console.log("se ejecuto");
  }
  
  submit() {
    if (this.nameform.valid) {
      if (this.isEdit) {
        this.updateTheme(this.tid, this.nameform.value.Name);
        this.close();
      } else {
        this.addTheme(this.nameform.value.Name);
        this.close();
      }
    }
  }

  //añadir temas de estudio 
  async addTheme(themeName: string) {
    if (themeName) {
      const newTheme: StudyThemeI = {
        id: this.firebaseService.createIdDoc(),
        tname: themeName
      };
      await this.firebaseService.createDocumentID(newTheme, `Users/${this.uid}/studythemes`, newTheme.id);
    }
  }

  //editar temas de estudio 
  async updateTheme(tid: string, themeName: string) {
    const updatedTheme: StudyThemeI = {
      id: tid,
      tname: themeName
    };
    await this.firebaseService.createDocumentID(updatedTheme, `Users/${this.uid}/studythemes`, updatedTheme.id);
  }
  
  //cerrar modal
  close() {
    this.closeModal.emit();
  }
  
  loadconfig() {
    if (this.istheme){
      if (this.isEdit) {
        this.buttontext = 'GUARDAR';
        this.tittle = 'Editar Tema de estudio';
        this.inputname = this.nameInput;
      }else{
        this.buttontext = 'CREAR';
        this.tittle = 'Crear Tema de estudio';	
        this.inputname = 'Nombre del tema';
      }
    }else{
      if (this.isEdit) {
        this.buttontext = 'GUARDAR';
        this.tittle = 'Editar Unidad';
        this.inputname = this.nameInput;
      }else{
        this.buttontext = 'CREAR';
        this.tittle = 'Crear Unidad';	
        this.inputname = 'Nombre de la unidad';
      }
    }
  }
}