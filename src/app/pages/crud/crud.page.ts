import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  public userProfile: any;
  public fullName: string;
  public gender: string;
  public skill: string[];
  public website: string;
  public shareMail: boolean = false;  

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.crudService.getProfile().get().then( userProfileSnapshot => {
      console.log('TRY');
      
      if (userProfileSnapshot.exists) {
        console.log("Document data:", userProfileSnapshot.data());
      } else {
        console.log("No such document!");
      }

      if (this.userProfile) {
        console.log('SUCCESS');
        this.userProfile = userProfileSnapshot.data();
        this.fullName = userProfileSnapshot.data().fullName;
        this.gender = userProfileSnapshot.data().gender;
        this.skill = userProfileSnapshot.data().skill;
        this.website = userProfileSnapshot.data().website;
        if (userProfileSnapshot.data().shareMail !== undefined) {
          this.shareMail = userProfileSnapshot.data().shareMail;
        }
      } else {
        console.log('FAILED');
      }  
    });
  }

  async confirmAlert() {
    const alert = await this.alertCtrl.create({
      message: 'CRUD Successfully saved!',
      buttons: [
        {
          text: 'Saved',
          handler: () => {
          this.router.navigate(['crud']);
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

  saveProfile(fullName: string, gender: string, skill: string[], website: string, shareMail: boolean): void {
    if (fullName === undefined || gender === undefined || skill === undefined || website === undefined || shareMail === undefined) {
      return;
    }
    this.crudService.saveProfile(fullName, gender, skill, website, shareMail)
      .then(() => {
        this.confirmAlert();
      }, 
      (error) => {
        this.ctrlAlert();
      });
    }    

}
