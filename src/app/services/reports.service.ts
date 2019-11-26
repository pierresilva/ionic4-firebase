import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  // Upload Task
  task: AngularFireUploadTask;
  // Progress in percentage
  percentage: Observable<number>;
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
  uploadedPath = new BehaviorSubject<any>(null);

  constructor(
    private firestore: AngularFirestore,
    private firestorage: AngularFireStorage,
  ) {
    this.isUploading = false;
    this.isUploaded = false;

    this.uploadedPath
    .subscribe(data => {
      console.log('ReportsService.uploadedPath: ', data);
    });
  }

  public getReports() {
    return this.firestore.collection('reports').snapshotChanges();
  }

  public saveReport(data: any) {
    return this.firestore.collection('reports').add(data);
  }

  public getReport(documentId: string) {
    return this.firestore.collection('reports').doc(documentId).ref.get();
  }

}
