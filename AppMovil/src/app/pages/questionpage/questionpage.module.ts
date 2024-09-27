import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuestionpagePageRoutingModule } from './questionpage-routing.module';
import { QuestionpagePage } from './questionpage.page';
import { SharedModule } from 'src/app/SharedModule/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionpagePageRoutingModule,
    SharedModule
  ],
  declarations: [QuestionpagePage]
})
export class QuestionpagePageModule {}
