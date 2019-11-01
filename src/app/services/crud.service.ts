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
  public userEvent: firebase.firestore.CollectionReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userID = user.uid;
        this.userProfile = this.db.collection("userProfile").doc(`${this.userID}`);        
        this.userEvent = this.db.collection("userEvent");
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

  getUserEvent(): firebase.firestore.CollectionReference {
    if(!this.userID) return;
    return this.userEvent;
  }  

  addUserEvent(
    eventName: string,
    eventPrice: string,
    eventDate: Date,
    eventDesc: string
  ): Promise<any> {
    if(!this.userID) return;
    return this.userEvent.add({ eventName, eventPrice, eventDate, eventDesc });
  }

  deleteUserEvent(id) {
    if(!this.userID) return;
    return this.userEvent.doc(id).delete();
  }

}
