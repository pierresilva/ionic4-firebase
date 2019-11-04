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
    console.log("Profile ionViewWillEnter");
    this.getUserProfile();  
  }  
  
  ionViewWillLeave() {
    console.log("Profile ionViewWillLeave");
    this.userProfile = null;
  }

  ngOnInit() {
    console.log("Profile ngOnInit");
    this.getUserProfile();
  }

  getUserProfile() {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.crudService.getUserProfile().get().then(userProfileSnapshot => {
            if (userProfileSnapshot.exists) {
              this.userProfile = userProfileSnapshot.data();
              console.log("profile data:", this.userProfile)
              resolve(true);
            } else {
              reject('User has not found!');
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
      this.userProfile = null;
      this.router.navigate(['login']);
    });
  }  

}
