import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuestionI } from 'src/app/models/questions.models';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.page.html',
  styleUrls: ['./testpage.page.scss'],
})

export class TestpagePage implements OnInit {
  title = 'Crea una nueva pregunta';
  photo: string = "/assets/cerebro-gymbro.png";
  question: string = "¿De que color es el cielo?";
  answers: string[] = [];
  isedit: boolean = false;
  QuestionI : any = {};
  buttontext: string = "Crear pregunta";
  @Output() closeModal = new EventEmitter<void>();
  
  constructor(){
    this.initializeQuestionI();
  }

  ngOnInit() {
    console.log(this.QuestionI.answers);
    this.addInput();
    if (this.isedit==false) {
      this.initializeQuestionI();
    }
  }

  initializeQuestionI() {
    if (!this.QuestionI || Object.keys(this.QuestionI).length === 0) {
      this.QuestionI = {
        type: "",
        note: "",
        question: "",
        answers: [],
        imagecod:null,
        id: ""
      };
    }
  }

  addInput() {
    this.initializeQuestionI();
    if (this.QuestionI.answers.length < 4) {
      this.QuestionI.answers.push("");
      console.log(this.QuestionI.answers);
    }
  }
   trackByIndex(index: number, obj: any): any {
    return index;
  }
  submit() {}

  //cerrar modal
  close() {
    this.closeModal.emit();
  }
}
