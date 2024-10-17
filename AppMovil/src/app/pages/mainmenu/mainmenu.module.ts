import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { IonicModule } from '@ionic/angular';
import { MainmenuPageRoutingModule } from './mainmenu-routing.module';
import { MainmenuPage } from './mainmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainmenuPageRoutingModule,
    SharedModule,
  ],
  declarations: [MainmenuPage]
})
export class MainmenuPageModule {}
