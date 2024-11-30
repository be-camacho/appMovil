import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SQLiteService } from 'src/app/services/SQLite.service';
import { QuestionI } from 'src/app/models/questions.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addquestionmodal',
  templateUrl: './addquestionmodal.component.html',
  styleUrls: ['./addquestionmodal.component.scss'],
})
export class AddQuestionModalComponent implements OnInit {

  title:string;
  cameraImg: string = "/assets/camera.png";
  photo: string;
  question: string;
  answers: string[] = [];
  buttontext: string;
  questionform: FormGroup;

  @Input() type: string;
  @Input() isEdit: boolean = false;
  @Input() QuestionI : QuestionI;
  @Input() uid: string;
  @Input() tid: string;
  @Input() sid: string;
  @Output() closeModal = new EventEmitter<void>();
  
  constructor(private firebaseService: FirebaseService){}

  ngOnInit() {
    this.configs(); //inicializo las configuraciones


    this.addInput();
    if (this.isEdit==false) {
    }
    console.log(this.QuestionI);
  }

  addInput() {
    if (this.QuestionI.answers.length < 4) {
      this.QuestionI.answers.push("");
      console.log(this.QuestionI.answers);
    }
  }
   trackByIndex(index: number, obj: any): any {
    return index;
  }
  

  //crear pregunta
  async addQuestion() {
    await this.firebaseService.createDocumentID(this.QuestionI, `Users/${this.uid}/studythemes/${this.tid}/subthemes/${this.sid}/questions`, this.QuestionI.id);
  }
  //editar pregunta
  async updateQuestion() {
    await this.firebaseService.createDocumentID(this.QuestionI, `Users/${this.uid}/studythemes/${this.tid}/subthemes/${this.sid}/questions`, this.QuestionI.id);
  }
  //tomarfoto
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    this.photo = image.base64String;
    this.QuestionI.imagecod = this.photo;
  }
  

  //configuraciones iniciales
  async configs(){
    if(this.isEdit){
      this.title = 'Edita la pregunta';
      this.buttontext = 'Guardar cambios';
      if(this.QuestionI.imagecod){
        this.photo = this.QuestionI.imagecod;
      }else{
        this.photo = this.cameraImg;
      }
    }else{
      this.title = 'Crea una nueva pregunta';
      this.buttontext = 'Crear pregunta';
      this.photo = this.cameraImg;
      this.initializeQuestion();
    }
  }

  //inicializar QuestionI si para una nueva pregunta
  initializeQuestion(){
    this.QuestionI={
      type: this.type,
      note: "",
      question: "",
      answers:[],
      imagecod: null,
      id: this.firebaseService.createIdDoc()
    }
  }

  //boton de submit 
  submit() {
    if(this.isEdit){
      this.updateQuestion();
      this.close();
    }else{
      this.addQuestion();
      this.close();
    }
  }


  //cerrar modal
  close() {
    this.closeModal.emit();
  }

}