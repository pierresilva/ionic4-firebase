import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

  date: any = new Date();
  testImg: any = null;

  public report = {
    id: null,
    data: {},
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public reportsService: ReportsService,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        params => {
          this.report.id = params.id;
          this.reportsService.getReport(this.report.id)
            .then((res) => {
              console.log(res.data());
              this.report.data = res.data();
            });
        });
    // this.testImage('assets/images/img1.jpg');

  }

  goTo(href: string) {
    this.router.navigateByUrl(href);
  }

  testImage(url) {
    let img = new Image();
    img.src = url;
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');

      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      ctx.drawImage(img, 0, 0);

      let uri = canvas.toDataURL('image/png');
      let b64 = uri.replace(/^data:image.+;base64,/, '');

      this.testImg = b64;

      console.log(b64);
    };

  }

}
