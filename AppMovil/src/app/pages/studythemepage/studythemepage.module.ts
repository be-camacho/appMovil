import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { IonicModule } from '@ionic/angular';

import { StudythemepagePageRoutingModule } from './studythemepage-routing.module';

import { StudythemepagePage } from './studythemepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudythemepagePageRoutingModule,
    SharedModule
  ],
  declarations: [StudythemepagePage]
})
export class StudythemepagePageModule {}
