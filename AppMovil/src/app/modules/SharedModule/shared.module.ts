import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundAnimationComponent } from '../../components/animated-background/animated-background.component';
import { NewQuestionsRoundComponent } from 'src/app/components/new-questions-round/new-questions-round.component';
import { IonicModule } from '@ionic/angular';
import { AddNewDocumentComponent } from '../../components/add-new-document/add-new-document.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [BackgroundAnimationComponent,NewQuestionsRoundComponent,AddNewDocumentComponent],
  imports: [CommonModule,IonicModule,ReactiveFormsModule],
  exports: [BackgroundAnimationComponent,NewQuestionsRoundComponent,AddNewDocumentComponent] // Si necesitas exportar el componente
})
export class SharedModule { }
