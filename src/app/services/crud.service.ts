import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private db = firebase.firestore();
  private userID: string;
  private userProfile: firebase.firestore.DocumentReference;
  private userEvent: firebase.firestore.DocumentReference;
  private EventList: firebase.firestore.CollectionReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userID = user.uid;
        this.userProfile = this.db.collection("userProfile").doc(`${this.userID}`);        
        this.userEvent = this.db.collection("userEvent").doc(`${this.userID}`);
        this.EventList = this.db.collection("userEvent");
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
    return this.userEvent.update({ eventName, eventPrice, eventDate, eventDesc });
  }

  getUserEvent(): firebase.firestore.DocumentReference {
    if(!this.userID) return;
    return this.userEvent;
  }

  getEventList(): firebase.firestore.CollectionReference {
    return this.EventList;
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
