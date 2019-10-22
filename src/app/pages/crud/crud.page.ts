import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from './../../services/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  public userProfile: any;
  public fullName: string;
  public skill: string[];
  public website: string;
  public email: string;
  public shareMail: boolean = false;

  constructor(
    private router: Router,
    private crudService: CrudService    
  ) {}

  ngOnInit() {
    console.log('Profile ngOnInit');
    // this.getUserProfile();
    // this.asyncUserProfile();  
  }

  getUserProfile(){
    this.crudService.getUserProfile().get().then(userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        console.log('Profile refresh',this.userProfile);
    });  
  }

  asyncUserProfile() {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.crudService.getUserProfile().get().then(userProfileSnapshot => {
            if (userProfileSnapshot) {
              console.log('async userProfileSnapshot', userProfileSnapshot);
              this.userProfile = userProfileSnapshot.data();
              this.email = userProfileSnapshot.data().email;
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
    this.router.navigate(['crud-edit']);
  }  

}
