import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthpagePage } from './authpage.page';

const routes: Routes = [
  {
    path: '',
    component: AuthpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthpagePageRoutingModule {}
