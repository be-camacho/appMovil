import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeofquestionsPage } from './timeofquestions.page';

const routes: Routes = [
  {
    path: '',
    component: TimeofquestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeofquestionsPageRoutingModule {}
