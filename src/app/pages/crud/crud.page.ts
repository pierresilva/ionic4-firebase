import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';

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
  public shareMail: boolean = false;  

  constructor(
    private router: Router,
    private crudService: CrudService    
  ) {}

  ngOnInit() {
    console.log('Profile ngOnInit');    
    this.userProfile = this.crudService.getUserProfile().valueChanges();
    console.log('Profile userprofile:', this.userProfile );   
    // this.crudService.getUserProfile().get().then( userProfileSnapshot => {
    //     this.userProfile = userProfileSnapshot.data();
    // });    
  }

  goEdit(): void {
    this.router.navigate(['crud-edit']);
  }

  

}
