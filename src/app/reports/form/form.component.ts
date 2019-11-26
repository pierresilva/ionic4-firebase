import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as firebase from "firebase";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  public report = {
    id: null,
    data: {
      date: new Date().toDateString(),
      comment: null,
      front: null,
      created_by: {
        name: null,
        user_id: null,
      },
      images: []
    },
  };

  // Upload Task
  task: AngularFireUploadTask;
  // Progress in percentage
  percentage: number;
  // Snapshot of uploading file
  snapshot: Observable<any>;
  // Uploaded File URL
  UploadedFileURL: Observable<string>;
  // File details
  fileName: string;
  fileSize: number;
  // Status check
  isUploading: boolean;
  isUploaded: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public reportService: ReportsService,
    private storage: AngularFireStorage,
    private auth: AuthService,
  ) {
    this.isUploading = false;
    this.isUploaded = false;
  }

  ngOnInit() {
    this.report.id = + this.route.snapshot.paramMap.get('id');
    console.log(this.report);
  }

  ionViewWillEnter() {
    console.log('Main ionViewWillEnter');
  }

  ionViewWillLeave() {
    console.log('Main ionViewWillLeave');
    this.report = {
      id: null,
      data: {
        date: new Date().toDateString(),
        comment: null,
        front: null,
        created_by: {
          name: null,
          user_id: null,
        },
        images: []
      },
    };
  }

  goTo(href: string) {
    this.router.navigateByUrl(href);
  }

  getFile(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      let b64 = reader.result.toString().replace(/^data:.+;base64,/, '');
      this.report.data.images.push(b64);
    };

    reader.readAsDataURL(file);
  }

  uploadFile(event: FileList) {

    // The File object
    const file = event.item(0);
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // Create the file metadata
    let metadata = {
      contentType: file.type
    };

    this.isUploading = true;
    this.isUploaded = false;

    this.fileName = file.name;
    // Create a root reference
    let storageRef = firebase.storage().ref();
    // Upload file and metadata to the object 'images/mountains.jpg'
    let uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      this.percentage = progress;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    },
      (err) => {
        this.isUploading = false;
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (err.name) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.isUploading = false;
          this.isUploaded = true;
          console.log('File available at', downloadURL);
          this.report.data.images.push(downloadURL);
        });
      });
  }

  save() {
    if (this.report.id === 0) {
      this.report.data.created_by = {
        name: '',
        user_id: '',
      };
      this.reportService.saveReport(this.report.data)
        .then((res) => {
          console.log(res);
          this.router.navigateByUrl('/tabs/reports');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

}
