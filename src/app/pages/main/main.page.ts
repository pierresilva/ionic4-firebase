import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from './../../services/crud.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public userProfile: any;
  public eventList: Array<any>;

  constructor(
    private router: Router,
    private crudService: CrudService,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.asyncEventList();
  }

  asyncUserProfile() {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.crudService.getUserProfile().get().then(userProfileSnapshot => {
            if (userProfileSnapshot.exists) {
              this.userProfile = userProfileSnapshot.data();
              resolve(true);
            } else {
              reject('Error: Data has not arrived yet!');
            }
        });
      }, 10);
    });
  }

  asyncEventList() {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.crudService.getEventList().get().then(eventListSnapshot => {
          console.log("Home eventListSnapshot", eventListSnapshot);
          if (eventListSnapshot.size > 0) {
            this.eventList = [];
            eventListSnapshot.forEach(snap => {
              console.log("Home snap", snap.data());
              this.eventList.push({
                eventName: snap.data().eventName,
                eventPrice: snap.data().eventPrice,
                eventDate: snap.data().eventDate,
                eventDesc: snap.data().eventDesc
              });
            });
            resolve(true);
          } else {
            reject('Error: Data has not arrived yet!');
          }          
        });
      }, 10);
    });
  }

}
