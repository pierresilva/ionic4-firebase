import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.page.html',
  styleUrls: ['./event-edit.page.scss'],
})
export class EventEditPage implements OnInit {

  public eventName: string;
  public eventPrice: string;
  public eventDate: Date;
  public eventDesc: string;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private crudService: CrudService  
  ) {}

  ngOnInit() {
    console.log('Event Edit ngOnInit');  
    this.asyncUserEvent();
  }

  asyncUserEvent() {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.crudService.getUserEvent().get().then(userEventSnapshot => {  
            if (userEventSnapshot.exists) {
              console.log('async userEventSnapshot', userEventSnapshot);
              this.eventName = userEventSnapshot.data().eventName;
              this.eventPrice = userEventSnapshot.data().eventPrice;
              this.eventDate = userEventSnapshot.data().eventDate;
              this.eventDesc = userEventSnapshot.data().eventDesc;
              resolve(true);
            } 
              /*If you want to add a control, you can open this control below 
              else {
              reject('Error: Data has not arrived yet!');
            }*/
        });
      }, 10);
    });
  } 

  async confirmAlert() {
    const alert = await this.alertCtrl.create({
      message: 'CRUD Successfully saved!',
      buttons: [
        {
          text: 'Saved',
          handler: () => {
          this.router.navigate(['event']);
          }
        }
      ],
      cssClass: 'alertConfirm'
    });
    await alert.present();
  }  

  async ctrlAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Save Failed',
      message: 'Not saved successfully',
      buttons: [
            {
                text: 'Ok',
                role: 'cancel'
            }
      ]
    });
    await alert.present();
  }

  saveUserEvent(
    eventName: string, 
    eventPrice: string,
    eventDate: Date,
    eventDesc: string): void {
    /*If you want to add a control, you can open this control below  
    if (eventName === undefined || 
        eventPrice === undefined ||
        eventDate === undefined || 
        eventDesc === undefined) {
      return;
    }
    */      
    this.crudService.saveUserEvent(eventName, eventPrice, eventDate, eventDesc)
      .then(() => {
        this.confirmAlert();
      }) 
      .catch(error => {
        this.ctrlAlert();
        console.error('Not saved successfully', error);
      });
  }  

  goEventPage(): void {
    this.router.navigate(['event']);
  }    

}
