import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReportsService } from '../services/reports.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  date: any = new Date();

  public reports: any[] = [];

  constructor(
    private router: Router,
    public authService: AuthService,
    public reportsService: ReportsService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Main ionViewWillEnter');
    this.getReports();
  }

  ionViewWillLeave() {
    console.log('Main ionViewWillLeave');
    this.reports = [];
  }

  goTo(href: string) {
    this.router.navigateByUrl(href);
  }

  getReports() {
    this.reportsService.getReports()
      .subscribe(
        (res) => {
          let reports = [];
          res.forEach((report: any) => {
            reports.push({
              id: report.payload.doc.id,
              data: report.payload.doc.data()
            });
          });
          this.reports = reports;
          console.log(this.reports);
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
