import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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
      answers: [],
      note: '',
      image: null
    };
    this.questionType = this.questionData.questionType;
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.questionData.image = image.dataUrl;
  }

  addAnswer() {
    if (this.questionData.answers.length < 4) {
      this.questionData.answers.push('');
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  async saveQuestion() {
    if (this.isValidQuestion()) {
      this.dismiss(this.questionData);
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  isValidQuestion() {
    if (this.questionData.questionType === '1') {
      return this.questionData.question && this.questionData.answers.length > 0;
    } else if (this.questionData.questionType === '2') {
      return this.questionData.question && this.questionData.answers.length > 0;
    } else if (this.questionData.questionType === '3') {
      return this.questionData.image || this.questionData.note;
    }
    return false;
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}