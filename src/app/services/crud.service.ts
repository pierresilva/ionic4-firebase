import { Injectable } from '@angular/core';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // public db = firebase.firestore();
  // public userProfile: firebase.firestore.DocumentReference;
  public userProfile: AngularFirestoreDocument<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    console.log("crud service start");
    // firebase.auth().onAuthStateChanged( user => {
    this.afAuth.auth.onAuthStateChanged( user => {  
      if (user) {
        // this.userProfile = this.db.collection("userProfile").doc(`${user.uid}`);
        this.userProfile = this.afs.collection("userProfile").doc(`${user.uid}`);
        console.log("userProfile data:", this.userProfile);
      }
    });
  }

  // getUserProfile(): firebase.firestore.DocumentReference {
  getUserProfile(): AngularFirestoreDocument<any> {  
    console.log("crud service get profile");
    return this.userProfile;
  }
  
  saveProfile(fullName: string, gender: string, skill: string[], website: string, shareMail: boolean): Promise<any> {
    console.log("crud service save profile");
    return this.userProfile.update({ fullName, gender, skill, website, shareMail});
  }  
}
