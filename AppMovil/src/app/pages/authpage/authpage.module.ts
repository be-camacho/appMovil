import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { IonicModule } from '@ionic/angular';

import { AuthpagePageRoutingModule } from './authpage-routing.module';

import { AuthpagePage } from './authpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthpagePageRoutingModule,
    SharedModule
  ],
  declarations: [AuthpagePage]
})
export class AuthpagePageModule {}
