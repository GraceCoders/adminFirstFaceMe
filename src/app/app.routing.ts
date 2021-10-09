import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes =[
  {
    path :'',
    component: LoginComponent
  },
  {
    path :'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path :'change-password',
    component: ChangePasswordComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
