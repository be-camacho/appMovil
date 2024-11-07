import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { QuestionI } from 'src/app/models/questions.models';
import { StudyThemeI } from 'src/app/models/studytheme.models';
import { SubthemeI } from 'src/app/models/subtheme.models';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-new-questions-round',
  templateUrl: './new-questions-round.component.html',
  styleUrls: ['./new-questions-round.component.scss'],
})

export class NewQuestionsRoundComponent  implements OnInit {
  @Input() uid: string;
  @Output() closeModal = new EventEmitter<void>();
  selectedlist: number = 1;
  quantityOfQuestions: boolean = false;
  themeList: StudyThemeI[] = [];
  subThemeList: SubthemeI[] = [];
  questionList: QuestionI[] = [];
  questionQuantity:number[] = [];
  tuid: string;
  loading: boolean = false;
  
  constructor(
    private firebaseService: FirebaseService,
    public loadingCtrl: LoadingController,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadStudyThemes();
  }

  async loadStudyThemes() {
    this.firebaseService.getCollectionChanges<StudyThemeI>(`Users/${this.uid}/studythemes`).subscribe((data) => {
      if (data) {
        this.themeList = data;
      }
    });
  }

  async loadSubThemes( tuid:string) {
    this.firebaseService.getCollectionChanges<SubthemeI>(`Users/${this.uid}/studythemes/${tuid}/subthemes`).subscribe((data) => {
      if (data) {
        this.subThemeList = data;
      }
    });
  }

  async loadQuestions(suid:string) {
    this.firebaseService.getCollectionChanges<QuestionI>(`Users/${this.uid}/studythemes/${this.tuid}/subthemes/${suid}/questions`).subscribe((data) => {
      if (data) {
        this.questionList = data;
        this.questionsLength();
      }
    });
  }

  async onThemeClick(theme: StudyThemeI) {
    await this.loadSubThemes(theme.id);
    this.tuid = theme.id;
    this.selectedlist = 2;
  }

  async onSubThemeClick(subTheme: SubthemeI) {
    const loading = await this.loadingCtrl.create();
    await loading.present();
      await this.loadQuestions(subTheme.id);
      this.quantityOfQuestions = true;
    loading.dismiss();
  }

  async onQuantityClick(quantity: number) {
    const loading = await this.loadingCtrl.create();
    await loading.present();
      const quantityQuestions = quantity
      const randomQuestions = this.questionList.sort(() => Math.random() - 0.5).slice(0, quantityQuestions);
      const correctAnswers = randomQuestions.map(question => question.answers[0])
    const navigationExtras: NavigationExtras = {
      state: {
        questions: randomQuestions,
        correctAnswers: correctAnswers
      }
    };
    loading.dismiss();
    this.router.navigate(['/timeofquestions'], navigationExtras);
  }

  async questionsLength(){
    const quantity = this.questionList.length
    this.questionQuantity = [];
    if(quantity < 10){
      this.questionQuantity.push(quantity)
    }else if(quantity < 20){
      this.questionQuantity.push(10)
    }else if(quantity < 30){
      this.questionQuantity.push(10,20)
    }else{
      this.questionQuantity.push(10,20,30)
    }
  }
  close() {
    this.closeModal.emit();
  }

}
