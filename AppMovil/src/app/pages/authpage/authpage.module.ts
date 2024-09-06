import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthpagePageRoutingModule } from './authpage-routing.module';

import { AuthpagePage } from './authpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthpagePageRoutingModule
  ],
  declarations: [AuthpagePage]
})
export class AuthpagePageModule {}
