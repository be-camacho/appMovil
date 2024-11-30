import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundAnimationComponent } from '../../components/animated-background/animated-background.component';
import { NewQuestionsRoundComponent } from 'src/app/components/new-questions-round/new-questions-round.component';
import { IonicModule } from '@ionic/angular';
import { AddNewDocumentComponent } from '../../components/add-new-document/add-new-document.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AddQuestionModalComponent } from 'src/app/components/addquestionmodal/addquestionmodal.component';
@NgModule({
  declarations: [BackgroundAnimationComponent,NewQuestionsRoundComponent,AddNewDocumentComponent,AddQuestionModalComponent],
  imports: [CommonModule,IonicModule,ReactiveFormsModule,FormsModule],
  exports: [BackgroundAnimationComponent,NewQuestionsRoundComponent,AddNewDocumentComponent,AddQuestionModalComponent] // Si necesitas exportar el componente
})
export class SharedModule { }
