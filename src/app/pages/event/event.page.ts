import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from './../../services/crud.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  public userEvent: any;

  constructor(
    private router: Router,
    private crudService: CrudService
  ) {}

  ionViewWillEnter() {
    console.log('Event ionViewWillEnter');
    this.asyncUserEvent();  
  }  

  // ionViewDidEnter() {
  //   console.log('Event ionViewDidEnter');
  //   this.asyncUserEvent();
  // }

  ionViewWillLeave() {
    console.log('Event ionViewWillLeave');
  }

  // ionViewDidLeave() {
  //   console.log('Event ionViewDidLeave');
  // }

  ngOnInit() {
    console.log('Event ngOnInit');
    this.asyncUserEvent();
  }

  asyncUserEvent() {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.crudService.getUserEvent().get().then(userEventSnapshot => {
            if (userEventSnapshot.exists) {
              this.userEvent = userEventSnapshot.data();
              resolve(true);
            } else {
              reject('Error: Data has not arrived yet!');
            }
        });
      }, 10);
    });
  }  

  goEdit(): void {
    this.router.navigate(['event-edit']);
  }  

}
