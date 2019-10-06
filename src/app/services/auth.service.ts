import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  register(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase.firestore().doc(`/user/${newUserCredential.user.uid}`).set({ email });
      })
      .catch(error => {        
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('Register Error! Code: ' + errorCode + ' Message: ' + errorMessage);
        throw new Error(error);
      });
  }  

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {        
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Login Error! Code: ' + errorCode + ' Message: ' + errorMessage);
      throw new Error(error);
    });
  }

  reset(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log('Reset email successfully sent.');
      })
      .catch(error => {        
        console.error('Reset Error!: ' + error);
        throw new Error(error);
      });
  }  

  logout(): Promise<void> {
    return firebase.auth().signOut()
    .then(() => {
      console.log('Successfully logged out.');
    })
    .catch(error => {        
      console.error('Logout Error!: ' + error);
      throw new Error(error);
    });    
  }  
  
  
}
