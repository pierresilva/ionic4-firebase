import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>;
  private db = firebase.firestore();

  constructor() {}

  register(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((credential: firebase.auth.UserCredential) => {
        this.db.collection("userProfile").doc(`${credential.user.uid}`).set({ email })
          .then( () => {
            console.log("Document successfully written!");
          })
          .catch( error => {
            console.error("Error writing document: ", error);
          });
      })
      .catch(error => {        
        console.error("Register Error: ", error);
        throw new Error(error);
      });
  }  

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.error("Login Error: ", error);
        throw new Error(error);
    });
  }

  reset(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log("Reset email successfully sent");
      })
      .catch(error => {        
        console.error("Reset Error!: ", error);
        throw new Error(error);
      });
  }  

  logout(): Promise<void> {
    return firebase.auth().signOut()
      .then(() => {
        console.log("Successfully logged out");
      })
      .catch(error => {        
        console.error("Logout Error: ", error);
        throw new Error(error);
      });    
  }  
  
  
}
