import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { countrycodes } from '../../models/countrycodes';
import { CountrycodesService } from '../../services/countrycodes.service';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  public fullName: string;
  public gender: string;
  public birthDate: Date;
  public skill: string[];
  public countryCodes: countrycodes[];
  public countryCode: string;
  public phoneNumber: string;
  public website: string;
  public sharePhone: boolean = false; 
  public shareWebsite: boolean = false;  

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private countrycodesService: CountrycodesService,
    private crudService: CrudService    
  ) {}

  ionViewWillEnter() {
    console.log('Profile Edit ionViewWillEnter');
    this.asyncUserProfile();  
  }  

  // ionViewDidEnter() {
  //   console.log('Profile Edit ionViewDidEnter');
  //   this.asyncUserProfile();
  // }

  ionViewWillLeave() {
    console.log('Profile Edit ionViewWillLeave');
  }

  // ionViewDidLeave() {
  //   console.log('Profile Edit ionViewDidLeave');
  // }  

  ngOnInit() {
    console.log('Profile Edit ngOnInit');
    this.asyncUserProfile();

    this.countrycodesService.getPhoneCodes().subscribe(codes => {
      this.countryCodes = codes;
    });    
  }

  asyncUserProfile() {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.crudService.getUserProfile().get().then(userProfileSnapshot => {
            if (userProfileSnapshot.exists) {
              this.fullName = userProfileSnapshot.data().fullName;
              this.gender = userProfileSnapshot.data().gender;
              this.birthDate = userProfileSnapshot.data().birthDate;
              this.skill = userProfileSnapshot.data().skill;
              this.countryCode = userProfileSnapshot.data().countryCode;
              this.phoneNumber = userProfileSnapshot.data().phoneNumber;
              this.website = userProfileSnapshot.data().website;
              if (userProfileSnapshot.data().sharePhone !== undefined &&
              userProfileSnapshot.data().shareWebsite !== undefined) {
                this.sharePhone = userProfileSnapshot.data().sharePhone;
                this.shareWebsite = userProfileSnapshot.data().shareWebsite;
              }
              resolve(true);
            } 
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
          this.router.navigate(['profile']);
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

  saveUserProfile(
    fullName: string, 
    gender: string,
    birthDate: Date,
    skill: string[],
    countryCode: string,
    phoneNumber: string,
    website: string, 
    sharePhone: boolean,
    shareWebsite: boolean): void {
    /*If you want to add a control, you can open this control below  
    if (fullName === undefined || 
        gender === undefined ||
        birthDate === undefined || 
        skill === undefined ||
        countryCode === undefined || 
        phoneNumber === undefined || 
        website === undefined) {
      return;
    }
    */
    this.crudService.saveUserProfile(fullName, gender, birthDate, skill, countryCode, phoneNumber, website, sharePhone, shareWebsite)
      .then(() => {
        this.confirmAlert();
      }) 
      .catch(error => {
        this.ctrlAlert();
        console.error("Not saved successfully", error);
      });
  }
  
  goProfilePage(): void {
    this.router.navigate(['profile']);
  }  

}
