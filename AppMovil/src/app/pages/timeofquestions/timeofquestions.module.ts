import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { IonicModule } from '@ionic/angular';

import { TimeofquestionsPageRoutingModule } from './timeofquestions-routing.module';

import { TimeofquestionsPage } from './timeofquestions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeofquestionsPageRoutingModule,
    SharedModule
  ],
  declarations: [TimeofquestionsPage]
})
export class TimeofquestionsPageModule {}
