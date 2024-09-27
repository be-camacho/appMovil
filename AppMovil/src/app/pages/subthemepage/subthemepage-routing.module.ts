import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubthemepagePage } from './subthemepage.page';

const routes: Routes = [
  {
    path: '',
    component: SubthemepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubthemepagePageRoutingModule {}
