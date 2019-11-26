import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReportsPage } from './reports.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsPage,
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },
  {
    path: 'edit/:id',
    component: FormComponent,
  },
  {
    path: 'new/:id',
    component: FormComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReportsPage,
    ViewComponent,
    FormComponent,
  ]
})
export class ReportsPageModule { }
