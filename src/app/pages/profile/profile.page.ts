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
  }  
  ionViewDidLeave() {
    console.log('Profile ionViewDidLeave');
  }

  ngOnInit() {
    console.log('Profile ngOnInit');
    this.asyncUserProfile();
  }

  ngOnDestroy() {
    console.log('Profile ngOnDestroy');
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

  goEdit(): void {
    this.router.navigate(['profile-edit']);
  }

  getOut(): void {
    this.crudService.getOut();
  }

  logout(): void {
    this.authService.logout().then(() => {
      // this.userProfile = null;
      this.getOut();
      this.router.navigate(['login']);
    });
  }  

}
