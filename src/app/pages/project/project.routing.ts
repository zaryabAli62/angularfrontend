import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guard/auth-guard';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { ProjectListingComponent } from './project-listing/project-listing.component';

const routes: Routes = [

  {path:'',component:ProjectListingComponent},
  {path: 'edit-project/:id', component: AddEditProjectComponent},
  {path: 'create-project', component: AddEditProjectComponent},

];

@NgModule({
        imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
