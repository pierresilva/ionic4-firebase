import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from './../../services/crud.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public userProfile: any;
  public eventList: Array<any>;
  public eventCheck = false;

  constructor(
    private router: Router,
    private crudService: CrudService,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
    console.log('Main ionViewWillEnter');
    this.getUserEvent();
  }

  ionViewWillLeave() {
    console.log('Main ionViewWillLeave');
    this.eventList = null;
  }

  ngOnInit() {
    console.log('Main ngOnInit');
    this.getUserEvent();
  }

  getUserEvent() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.crudService.getUserEvent().get().then(eventListSnapshot => {
          if (eventListSnapshot.size > 0) {
            this.eventList = [];
            eventListSnapshot.forEach(snap => {
              this.eventList.push({
                id: snap.id,
                eventName: snap.data().eventName,
                eventPrice: snap.data().eventPrice,
                eventDate: snap.data().eventDate,
                eventDesc: snap.data().eventDesc
              });
            });
            this.eventCheck = true;
            resolve(true);
          } else {
            this.eventCheck = false;
            reject('Event has not found!');
          }
        });
      }, 10);
    });
  }

  deleteUserEvent(id) {
    this.crudService.deleteUserEvent(id)
    .then(() => {
      console.log('Document successfully deleted!');
      this.getUserEvent();
    })
    .catch(error => {
      console.error('Error removing document: ', error);
    });
  }

}
