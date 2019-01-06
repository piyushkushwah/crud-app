import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './person/all/all.component';
import { NewComponent } from './person/new/new.component';
import { EditComponent } from './person/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'person/all',
    pathMatch: 'full'
  },
  {
    path: 'person',
    redirectTo: 'person/all',
    pathMatch: 'full'
  },
  {
    path: 'person/all',
    component: AllComponent
  },
  {
    path: 'person/new',
    component: NewComponent
  },
  {
    path: 'person/edit/:id',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
