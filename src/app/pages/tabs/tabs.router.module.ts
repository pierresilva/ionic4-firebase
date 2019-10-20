import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'main',
        children: [
          {
            path: '',
            loadChildren: () => import('../main/main.module').then( m => m.MainPageModule),
            canActivate: [GuardService]
          }
        ]
      },
      {
        path: 'crud',
        children: [
          {
            path: '',
            loadChildren: () => import('../crud/crud.module').then( m => m.CrudPageModule),
            canActivate: [GuardService]
          },
          {
            path: 'crud-edit',
            loadChildren: () => import('../crud-edit/crud-edit.module').then( m => m.CrudEditPageModule),            
            canActivate: [GuardService]
          }          
        ]
      },
      // redirect in
      {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full',
        canActivate: [GuardService]
      }
    ]
  },
  // redirect out
  {
    path: '',
    redirectTo: '/tabs/main',
    pathMatch: 'full',
    canActivate: [GuardService]
  },
  {
    path: 'crud',
    redirectTo: '/tabs/crud',
    pathMatch: 'full',
    canActivate: [GuardService]
  },
  {
    path: 'crud-edit',
    redirectTo: '/tabs/crud/crud-edit',
    pathMatch: 'full',
    canActivate: [GuardService]
  }  
];
/*
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRouterModule { }
