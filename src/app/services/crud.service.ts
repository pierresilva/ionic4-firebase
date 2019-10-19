import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private db = firebase.firestore();
  public userProfile: firebase.firestore.DocumentReference;

  constructor() {
    console.log("crud service start");
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        // this.userProfile = this.db.doc(`/userProfile/${user.uid}`);
        this.userProfile = this.db.collection("userProfile").doc(`${user.uid}`);
        console.log("userProfile data:", this.userProfile); //reference
      }
    });
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    console.log("crud service get profile");
    return this.userProfile;
  }
  
  saveProfile(fullName: string, gender: string, skill: string[], website: string, shareMail: boolean): Promise<any> {
    console.log("crud service save profile");
    return this.userProfile.update({ fullName, gender, skill, website, shareMail});
  }  
}
