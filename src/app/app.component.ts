import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { environment } from '../environments/environment';
// import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private router: Router
    // public authService: AuthService
  ) {
    //firebase initialize
    firebase.initializeApp(environment.firebase);
    firebase.auth().onAuthStateChanged( (user: firebase.User) => {
      if(!user){
        console.log("No user is signed in.");
        this.router.navigate(['login']);
      }else{
        console.log("User is signed in");
        this.router.navigate(['tabs']);
      }
    });    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
