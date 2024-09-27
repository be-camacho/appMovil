import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/SharedModule/shared.module';
import { IonicModule } from '@ionic/angular';

import { SubthemepagePageRoutingModule } from './subthemepage-routing.module';

import { SubthemepagePage } from './subthemepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubthemepagePageRoutingModule,
    SharedModule
  ],
  declarations: [SubthemepagePage]
})
export class SubthemepagePageModule {}
