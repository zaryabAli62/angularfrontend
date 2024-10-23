import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/register-login/register-login.component';
import { authGuard } from './core/guard/auth-guard';

import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'register',component:LoginComponent},
  {path:'ibook',component:LayoutComponent,loadChildren: () => import("./pages/project/project.module").then((m) => m.ProjectModule),canActivate:[authGuard]
   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
