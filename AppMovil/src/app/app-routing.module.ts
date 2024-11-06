import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mainmenu',
    loadChildren: () => import('./pages/mainmenu/mainmenu.module').then( m => m.MainmenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'authpage',
    loadChildren: () => import('./pages/authpage/authpage.module').then( m => m.AuthpagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'questionpage',
    loadChildren: () => import('./pages/questionpage/questionpage.module').then( m => m.QuestionpagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'studythemepage',
    loadChildren: () => import('./pages/studythemepage/studythemepage.module').then( m => m.StudythemepagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'subthemepage',
    loadChildren: () => import('./pages/subthemepage/subthemepage.module').then( m => m.SubthemepagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'timeofquestions',
    loadChildren: () => import('./pages/timeofquestions/timeofquestions.module').then( m => m.TimeofquestionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'testpage',
    loadChildren: () => import('./pages/testpage/testpage.module').then( m => m.TestpagePageModule),
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
