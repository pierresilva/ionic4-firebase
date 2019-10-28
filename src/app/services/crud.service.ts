import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public db = firebase.firestore();
  public userID: string;
  public userProfile: firebase.firestore.DocumentReference;
  public userEvent: firebase.firestore.DocumentReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userID = user.uid;
        this.userProfile = this.db.collection("userProfile").doc(`${this.userID}`);        
        this.userEvent = this.db.collection("userEvent").doc(`${this.userID}`);
      }
    });
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    if(!this.userID) return;
    return this.userProfile;
  }
  
  saveUserProfile(
    fullName: string, 
    gender: string,
    birthDate: Date,
    skill: string[],
    countryCode: string,
    phoneNumber: string,
    website: string, 
    sharePhone: boolean,
    shareWebsite: boolean): Promise<any> {
    if(!this.userID) return;
    return this.userProfile.update({ fullName, gender, birthDate, skill, countryCode, phoneNumber, website, sharePhone, shareWebsite });
  }  

  saveUserEvent(
    eventName: string,
    eventPrice: string,
    eventDate: Date,
    eventDesc: string
  ): Promise<any> {
    if(!this.userID) return;
    return this.userEvent.set({ eventName, eventPrice, eventDate, eventDesc });
  }

  getUserEvent(): firebase.firestore.DocumentReference {
    if(!this.userID) return;
    return this.userEvent;
  }

  deleteUserEvent() {
    if(!this.userID) return;
    this.db.collection("userEvent").doc(`${this.userID}`).delete().then(() => {
      console.log("Event successfully deleted!");
    })
    .catch(error => {  
      console.error("Event delete error!", error);
    });
  }

}
