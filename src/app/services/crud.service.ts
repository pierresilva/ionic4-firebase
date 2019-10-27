import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public db = firebase.firestore();
  public currentUser: firebase.User;
  public userProfile: firebase.firestore.DocumentReference;
  public userEvent: firebase.firestore.DocumentReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = this.db.collection("userProfile").doc(`${this.currentUser.uid}`);        
        console.log("userProfile doc:", this.userProfile);
        this.userEvent = this.db.collection("userEvent").doc(`${this.currentUser.uid}`);
        console.log("eventList doc:", this.userEvent);
      }
    });
  }

  getUserProfile(): firebase.firestore.DocumentReference {
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
    return this.userProfile.update({ fullName, gender, birthDate, skill, countryCode, phoneNumber, website, sharePhone, shareWebsite });
  }  

  saveUserEvent(
    eventName: string,
    eventPrice: string,
    eventDate: Date,
    eventDesc: string
  ): Promise<any> {
    return this.userEvent.set({ eventName, eventPrice, eventDate, eventDesc });
  }

  getUserEvent(): firebase.firestore.DocumentReference {
    return this.userEvent;
  }

  deleteUserEvent() {
    this.db.collection("userEvent").doc(`${this.currentUser.uid}`).delete().then(() => {
      console.log('Event successfully deleted!');
    })
    .catch(error => {  
      console.error('Event delete error!', error);
    });
  }

}
