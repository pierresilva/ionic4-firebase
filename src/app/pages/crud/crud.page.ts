import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  // public userProfile: AngularFirestoreDocument<any>;
  public userProfile;
  public fullName: string;
  public skill: string[];
  public website: string;
  public shareMail: boolean = false;  

  constructor(
    private router: Router,
    private crudService: CrudService    
  ) {}

  ngOnInit() {
    console.log('Profile ngOnInit');
    this.crudService.getUserProfile().get().then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
    });    
  }

  goEdit(): void {
    this.router.navigate(['crud-edit']);
  }

  

}
