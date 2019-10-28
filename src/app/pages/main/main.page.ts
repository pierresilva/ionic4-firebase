import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from './../../services/crud.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public userProfile: any;

  constructor(
    private router: Router,
    private crudService: CrudService,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.asyncUserProfile();
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

}
