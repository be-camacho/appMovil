import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Data, } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StudyThemeI } from 'src/app/models/studytheme.models';
import { QuestionI } from 'src/app/models/questions.models';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SubthemeI } from 'src/app/models/subtheme.models';
import { AddQuestionModalComponent } from 'src/app/components/addquestionmodal/addquestionmodal.component';

@Component({
  selector: 'app-questionpage',
  templateUrl: './questionpage.page.html',
  styleUrls: ['./questionpage.page.scss'],
})
export class QuestionpagePage implements OnInit {

  newQuestion: QuestionI;
  questions: QuestionI[] = [];
  themeForm: FormGroup;
  loading: boolean = false;
  editMode: boolean = false;
  deletMode: boolean = false;
  selectedSubTheme: SubthemeI;
  selecteStudyTheme: StudyThemeI;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private modalController: ModalController, 
    ){
      
    }

  ngOnInit() {
    this.loadQuestions();
    this.route.params.subscribe(params => {
      if (params['subTheme'] && params['studyTheme']) {
        this.selecteStudyTheme = JSON.parse(params['studyTheme']);
        console.log('Received item:', this.selecteStudyTheme);
        this.selectedSubTheme = JSON.parse(params['subTheme']);
        console.log('Received item:', this.selectedSubTheme);
      }
    });
  }

  async loadQuestions() {
    const currentUser = await this.authService.getProfile();
    const tuid = this.selecteStudyTheme.id;
    const suid = this.selectedSubTheme.id;
    const uid = currentUser.uid;
    this.firebaseService.getCollectionChanges<QuestionI>(`Users/${uid}/studythemes/${tuid}/subthemes/${suid}/questions`).subscribe((data) => {
      if (data) {
        this.questions = data;
      }
    });
  }

  async addQuestion(question: Data) {
    if (question) {
      const currentUser = await this.authService.getProfile();
      console.log('Current user:', currentUser);
      if (currentUser) {
        const uid = currentUser.uid;
        const tuid = this.selecteStudyTheme.id;
        const suid = this.selectedSubTheme.id;
        const newQuestion: QuestionI = {
          type: question['questionType'],
          note: question['note'],
          question: question['question'],
          answers: question['answers'],
          imagecod: question['image'],
          id: this.firebaseService.createIdDoc(),
        };
        await this.firebaseService.createDocumentID(newQuestion, `Users/${uid}/studythemes/${tuid}/subthemes/${suid}/questions`, newQuestion.id);
        this.questions.push(newQuestion);
      }
    }
  }
  async updateQuestion(id: string, question: QuestionI) {
    const currentUser = await this.authService.getProfile();
    if (currentUser) {
      const uid = currentUser.uid;
      const tuid = this.selecteStudyTheme.id;
      const suid = this.selectedSubTheme.id;
      const updatedQuestion: QuestionI = {
        type: question.type,
        note: question.note,
        question: question.question,
        answers: question.answers,
        imagecod: question.imagecod,
        id: id
      };
      await this.firebaseService.createDocumentID(updatedQuestion, `Users/${uid}/studythemes/${tuid}/subthemes/${suid}/questions`, updatedQuestion.id);
    }
  }

  async openAddQuestionModal() {
    const modal = await this.modalController.create({
      component: AddQuestionModalComponent,
      componentProps: {
        title: 'Crear una nueva Pregunta',
        button: 'Crear'
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.addQuestion(data.data);
      }
    });
    return await modal.present();
  }

  async openEditQuestionModal(question: QuestionI) {
    const modal = await this.modalController.create({
      component: AddQuestionModalComponent,
      componentProps: {
        title: 'Editar Pregunta',
        button: 'Guardar',
        questionData: question
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.updateQuestion(question.id, data.data);
      }
    });
    return await modal.present();
  }

  async deleteQuestion(question: QuestionI) {
    const currentUser = await this.authService.getProfile();
    const uid = currentUser.uid;
    const tuid = this.selecteStudyTheme.id;
    const suid = this.selectedSubTheme.id;
    this.firebaseService.deleteDocumentID(`Users/${uid}/studythemes/${tuid}/subthemes/${suid}/questions`, question.id);
  }

  onItemClick(item: QuestionI) {
    if (this.editMode) {
      this.openEditQuestionModal(item);
    } else if (this.deletMode) {
      this.deleteQuestion(item);
    }
    //podria agregar un modal para ver todos los detalles de la pregunta fijos 
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
