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

  public userProfile: any;
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
    console.log("Profile Edit ionViewWillEnter");
    this.getUserProfile();  
  }  

  ionViewWillLeave() {
    console.log("Profile Edit ionViewWillLeave");
    this.userProfile = null;
  }

  ngOnInit() {
    console.log("Profile Edit ngOnInit");
    this.getUserProfile();

    this.countrycodesService.getPhoneCodes().subscribe(codes => {
      this.countryCodes = codes;
    });    
  }

  getUserProfile() {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.crudService.getUserProfile().get().then(userProfileSnapshot => {
            if (userProfileSnapshot.exists) {
              this.userProfile = userProfileSnapshot.data();
              this.fullName = this.userProfile.fullName;
              this.gender = this.userProfile.gender;
              this.birthDate = this.userProfile.birthDate;
              this.skill = this.userProfile.skill;
              this.countryCode = this.userProfile.countryCode;
              this.phoneNumber = this.userProfile.phoneNumber;
              this.website = this.userProfile.website;
              if (this.userProfile.sharePhone !== undefined &&
                  this.userProfile.shareWebsite !== undefined) 
                {
                this.sharePhone = this.userProfile.sharePhone;
                this.shareWebsite = this.userProfile.shareWebsite;
                }
              resolve(true);
            } else {
              reject('User has not found!');
            }
        });
      }, 10);
    });
  } 

  async confirmAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Profile Successfully saved!',
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
    this.crudService.saveUserProfile(fullName, gender, birthDate, skill, countryCode, phoneNumber, website, sharePhone, shareWebsite)
      .then(() => {
        this.confirmAlert();
      }) 
      .catch(() => {
        this.ctrlAlert();
      });
  }
  
  goProfilePage(): void {
    this.router.navigate(['profile']);
  }  

}
