import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addquestionmodal',
  templateUrl: './addquestionmodal.component.html',
  styleUrls: ['./addquestionmodal.component.scss'],
})
export class AddQuestionModalComponent implements OnInit {
  @Input() title: string;
  @Input() button: string;
  @Input() questionData: any = {};
  questionType: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (this.questionData && Object.keys(this.questionData).length > 0) {
      this.initializeQuestionData();
    } else {
      this.resetQuestionData();
    }
  }

  initializeQuestionData() {
    this.questionData.questionType = this.questionData.questionType || '';
    this.questionType = this.questionData.questionType;
  }

  onQuestionTypeChange() {
    this.questionType = this.questionData.questionType;
  }

  resetQuestionData() {
    this.questionData = {
      questionType: '',
      question: '',
      correctAnswer: '',
      answers: [],
      answer: '',
      note: '',
      image: null
    };
    this.questionType = this.questionData.questionType;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.questionData.image = file;
  }

  addAnswer() {
    if (this.questionData.answers.length < 3) {
      this.questionData.answers.push('');
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  async saveQuestion() {
    if (this.isValidQuestion()) {
      if (this.questionData.questionType === '1') {
        // Asegurarse de que la respuesta correcta esté en la primera posición del arreglo answers
        this.questionData.answers = [this.questionData.correctAnswer, ...this.questionData.answers.filter(answer => answer)];
      } else if (this.questionData.questionType === '2') {
        // Asegurarse de que la respuesta esté en el arreglo answers
        this.questionData.answers = [this.questionData.answer];
      }
      this.dismiss(this.questionData);
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  isValidQuestion() {
    if (this.questionData.questionType === '1') {
      return this.questionData.question && this.questionData.correctAnswer && this.questionData.answers.length <= 3;
    } else if (this.questionData.questionType === '2') {
      return this.questionData.question && this.questionData.answer;
    } else if (this.questionData.questionType === '3') {
      return this.questionData.image || this.questionData.note;
    }
    return false;
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}