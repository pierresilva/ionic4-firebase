import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public db = firebase.firestore();
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor() {
    console.log("crud service start");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = this.db.collection("userProfile").doc(`${this.currentUser.uid}`);        
        console.log("userProfile doc:", this.userProfile);
      }
    });
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    console.log("crud service get profile");
    return this.userProfile;
  }
  
  saveProfile(
    fullName: string, 
    gender: string,
    birthDate: Date,
    skill: string[],
    countryCode: string,
    phoneNumber: string,
    website: string, 
    sharePhone: boolean,
    shareWebsite: boolean): Promise<any> {
    console.log("crud service save profile");
    return this.userProfile.update({ fullName, gender, birthDate, skill, countryCode, phoneNumber, website, sharePhone, shareWebsite });
  }  
}
