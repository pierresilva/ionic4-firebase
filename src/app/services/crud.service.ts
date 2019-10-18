import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public userProfile: firebase.firestore.DocumentReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
        console.log('user:' + this.userProfile);
      }
    });
  }

  getProfile(): firebase.firestore.DocumentReference {
    console.log('1');
    return this.userProfile;
  }
  
  saveProfile(fullName: string, gender: string, skill: string[], website: string, shareMail: boolean): Promise<any> {
    return this.userProfile.update({ fullName,gender,skill,website,shareMail});
  }  
}
