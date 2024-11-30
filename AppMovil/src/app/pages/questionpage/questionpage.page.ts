import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Data, } from '@angular/router';
import { StudyThemeI } from 'src/app/models/studytheme.models';
import { QuestionI } from 'src/app/models/questions.models';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SubthemeI } from 'src/app/models/subtheme.models';
import { SQLiteService } from 'src/app/services/SQLite.service';

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
  isActiveModal: boolean = false;
  questionI: any = {};
  uid: string;
  tid: string;
  sid: string;
  type: string = "1";

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private sqliteService: SQLiteService
    ){
      
    }
  
  ngOnInit() {
    this.loadQuestions();
    this.initializeDatabase();
    this.route.params.subscribe(params => {
      if (params['subTheme'] && params['studyTheme']) {
        this.selecteStudyTheme = JSON.parse(params['studyTheme']);
        this.selectedSubTheme = JSON.parse(params['subTheme']);
      }
    });
    this.loadParameters();
  }

  async initializeDatabase() {
    await this.sqliteService.initializeDatabase();
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
  async loadParameters() {
    this.uid = (await this.authService.getProfile()).uid;
    this.tid = this.selecteStudyTheme.id;
    this.sid = this.selectedSubTheme.id;
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
          imagecod: question['image'] || null,
          id: this.firebaseService.createIdDoc(),
        };
        await this.firebaseService.createDocumentID(newQuestion, `Users/${uid}/studythemes/${tuid}/subthemes/${suid}/questions`, newQuestion.id);
        await this.sqliteService.addQuestionImage(newQuestion.id, newQuestion.imagecod); // Guardar en SQLite
      }
    }
  }

  async updateQuestion(id: string, question: { [key: string]: any }) {
    const currentUser = await this.authService.getProfile();
    if (currentUser) {
      const uid = currentUser.uid;
      const tuid = this.selecteStudyTheme.id;
      const suid = this.selectedSubTheme.id;
      const updatedQuestion: QuestionI = {
        type: question['questionType'],
        note: question['note'],
        question: question['question'],
        answers: question['answers'],
        imagecod: question['image'] || null,
        id: id
      };
      await this.firebaseService.createDocumentID(updatedQuestion, `Users/${uid}/studythemes/${tuid}/subthemes/${suid}/questions`, updatedQuestion.id);
      await this.sqliteService.addQuestionImage(updatedQuestion.id, updatedQuestion.imagecod); // Guardar en SQLite
    }
  }
  async openEditQuestionModal(question: QuestionI) {
    this.questionI = question;
    this.isActiveModal = true;
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
  async openModal() {
    this.isActiveModal = true;
  }
  async closeModal() {
    this.isActiveModal = false;
  }
}
