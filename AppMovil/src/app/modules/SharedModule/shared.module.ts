import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundAnimationComponent } from '../../components/animated-background/animated-background.component';
import { NewQuestionsRoundComponent } from 'src/app/components/new-questions-round/new-questions-round.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BackgroundAnimationComponent,NewQuestionsRoundComponent],
  imports: [CommonModule,IonicModule],
  exports: [BackgroundAnimationComponent,NewQuestionsRoundComponent], // Si necesitas exportar el componente
})
export class SharedModule { }
