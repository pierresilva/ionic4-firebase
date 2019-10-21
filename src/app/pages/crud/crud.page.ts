import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';

import { profile } from '../../models/profile';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  // public userProfile: AngularFirestoreDocument<any>;
  public userProfile;
  // public fullName: string;
  // public skill: string[];
  // public website: string;
  // public shareMail: boolean = false;
  profiles: profile[];

  constructor(
    private router: Router,
    private crudService: CrudService    
  ) {}

  ngOnInit() {
    console.log('Profile ngOnInit');
    // this.crudService.getUserProfile().get().then( userProfileSnapshot => {
    //     this.userProfile = userProfileSnapshot.data();
    // });    
    this.crudService.getUserProfile().subscribe( profiles => {
      console.log(profiles);
    });
  }

  goEdit(): void {
    this.router.navigate(['crud-edit']);
  }

  

}
