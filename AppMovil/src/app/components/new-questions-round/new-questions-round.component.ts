import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  questionQuantity:number[];
  
  constructor(private modalController: ModalController, private firebaseService: FirebaseService) {}
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
  async loadQuestions( tuid:string) {
    this.firebaseService.getCollectionChanges<QuestionI>(`Users/${this.uid}/studythemes/${tuid}/subthemes`).subscribe((data) => {
      if (data) {
        this.questionList = data;
      }
    });
  }
  async onThemeClick(theme: StudyThemeI) {
    await this.loadSubThemes(theme.id);
    this.selectedlist = 2;
  }
  async onSubThemeClick(subTheme: SubthemeI) {
    await this.loadQuestions(subTheme.id);
    this.quantityOfQuestions = true;
    console.log(this.questionList)
  }

  async questionsLength(){
    const quantity = this.questionList.length
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
