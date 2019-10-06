import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule',
            // canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'crud',
        children: [
          {
            path: '',
            loadChildren: '../favourite/favourite.module#FavouritePageModule',
            // canActivate: [AuthGuard]
          }
        ]
      },
      // redirect in
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
        // canActivate: [AuthGuard]
      }
    ]
  },
  // redirect out
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'crud',
    redirectTo: '/tabs/crud',
    pathMatch: 'full',
    // canActivate: [AuthGuard]
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
