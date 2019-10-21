import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import * as firebase from 'firebase/app';
// import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { environment } from '../environments/environment';

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
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    // firebase.initializeApp(environment.firebase);
    // firebase.auth().onAuthStateChanged( (user: firebase.User) => {
    this.afAuth.auth.onAuthStateChanged( (user: firebase.User) => {
      if(!user){
        console.log('TEST 1');
        this.router.navigate(['login']);
      }else{
        console.log('TEST 2');
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
