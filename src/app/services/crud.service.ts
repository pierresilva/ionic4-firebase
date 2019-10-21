import { Injectable } from '@angular/core';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // public db = firebase.firestore();
  // public userProfile: firebase.firestore.DocumentReference;

  profileCollection: AngularFirestoreCollection<profile>;
  userProfiles: Observable<profile[]>;

  constructor(
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {
    console.log("crud service start");
    // firebase.auth().onAuthStateChanged( user => {
    this.afAuth.auth.onAuthStateChanged( user => {
      if (user) {
        // this.userProfile = this.db.collection("userProfile").doc(`${user.uid}`);
        this.userProfiles =this.afStore.collection('userProfile').valueChanges();
        console.log("userProfiles data:", this.userProfiles);
      }
    });
  }

  // getUserProfile(): firebase.firestore.DocumentReference {
  getUserProfile() {  
    console.log("crud service get profile");
    return this.userProfiles;
  }
  
  // saveProfile(fullName: string, gender: string, skill: string[], website: string, shareMail: boolean): Promise<any> {
  saveProfile(fullName: string, gender: string, skill: string[], website: string, shareMail: boolean) {  
    console.log("crud service save profile");
    // return this.userProfile.update({ fullName, gender, skill, website, shareMail});
    // return this.userProfiles.update({ fullName, gender, skill, website, shareMail});
  }  
}
