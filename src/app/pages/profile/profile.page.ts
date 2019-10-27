import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from './../../services/crud.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public userProfile: any;

  constructor(
    private router: Router,
    private crudService: CrudService,
    private authService: AuthService 
  ) {}

  ionViewWillEnter() {
    console.log('Profile ionViewWillEnter');
    this.asyncUserProfile();  
  }  
  ionViewDidEnter() {
    console.log('Profile ionViewDidEnter');
    this.asyncUserProfile();
  }  
  ionViewWillLeave() {
    console.log('Profile ionViewWillLeave');
    this.asyncUserProfile();
  }  
  ionViewDidLeave() {
    console.log('Profile ionViewDidLeave');
    this.asyncUserProfile();
  }

  ngOnInit() {
    console.log('Profile ngOnInit');
    this.asyncUserProfile();  
  }

  asyncUserProfile() {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.crudService.getUserProfile().get().then(userProfileSnapshot => {
            if (userProfileSnapshot.exists) {
              console.log('async userProfileSnapshot', userProfileSnapshot);
              this.userProfile = userProfileSnapshot.data();
              console.log('async userProfile', this.userProfile);
              resolve(true);
            } else {
              reject('Error: Data has not arrived yet!');
            }
        });
      }, 10);
    });
  }

  goEdit(): void {
    this.router.navigate(['profile-edit']);
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['login']);
    });
  }  

}
