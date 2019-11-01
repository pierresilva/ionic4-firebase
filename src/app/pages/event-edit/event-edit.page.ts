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
  
  public userEvent: any;
  public eventName: string;
  public eventPrice: string;
  public eventDate: Date;
  public eventDesc: string;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private crudService: CrudService  
  ) {}

  ionViewWillEnter() {
    console.log("Event Edit ionViewWillEnter");
  }  

  ionViewWillLeave() {
    console.log("Event Edit ionViewWillLeave");
  }

  ngOnInit() {
    console.log("Event Edit ngOnInit");
  }

  async confirmAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Event added!',
      buttons: [
        {
          text: 'Saved',
          handler: () => {
          this.router.navigate(['']);
          }
        }
      ],
      cssClass: 'alertConfirm'
    });
    await alert.present();
  }  

  async ctrlAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Event failed',
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
  
  addUserEvent(
    eventName: string, 
    eventPrice: string,
    eventDate: Date,
    eventDesc: string): void {      
    this.crudService.addUserEvent(eventName, eventPrice, eventDate, eventDesc)
      .then(() => {
        this.confirmAlert();
      }) 
      .catch(error => {
        this.ctrlAlert();
      });
  }    

}
