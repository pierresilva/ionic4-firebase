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
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule),
            canActivate: [GuardService]
          },
          {
            path: 'profile-edit',
            loadChildren: () => import('../profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule),            
            canActivate: [GuardService]
          }          
        ]
      },
      {
        path: 'event',
        children: [
          {
            path: '',
            loadChildren: () => import('../event/event.module').then( m => m.EventPageModule),
            canActivate: [GuardService]
          },
          {
            path: 'event-edit',
            loadChildren: () => import('../event-edit/event-edit.module').then( m => m.EventEditPageModule),            
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
    path: 'profile',
    redirectTo: '/tabs/profile',
    pathMatch: 'full',
    canActivate: [GuardService]
  },
  {
    path: 'profile-edit',
    redirectTo: '/tabs/profile/profile-edit',
    pathMatch: 'full',
    canActivate: [GuardService]
  },
  {
    path: 'event',
    redirectTo: '/tabs/event',
    pathMatch: 'full',
    canActivate: [GuardService]
  },
  {
    path: 'event-edit',
    redirectTo: '/tabs/event/event-edit',
    pathMatch: 'full',
    canActivate: [GuardService]
  },  
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
