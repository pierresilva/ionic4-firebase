import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          console.log('canActivate, User is signed in');
          resolve(true);
        } else {
          console.log('canActivate, No user is signed in');
          this.router.navigate(['login']);
          resolve(false);
        }
      });
    });
  }
}
