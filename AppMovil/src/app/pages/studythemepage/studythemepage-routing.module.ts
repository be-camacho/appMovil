import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudythemepagePage } from './studythemepage.page';

const routes: Routes = [
  {
    path: '',
    component: StudythemepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudythemepagePageRoutingModule {}
