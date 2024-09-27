import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionpagePage } from './questionpage.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionpagePageRoutingModule {}
