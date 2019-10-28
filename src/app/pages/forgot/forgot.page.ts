import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  public resetForm: FormGroup;
  public loading: HTMLIonLoadingElement;  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertCtrl: AlertController,    
    private authService: AuthService
  ) 
  {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit() {
  }

  async ctrlAlertError() {
    const alert = await this.alertCtrl.create({
      header: 'Request failed',
      message: 'Please do again',
      buttons: ['OK']
    });
    await alert.present();
  }

  async ctrlAlertSuccess() {
    const alert = await this.alertCtrl.create({
      header: 'Complete request',
      message: 'We just sent you a reset link to your email',
      buttons: ['OK']
    });
    await alert.present();
  }  

  async resetFirebase(): Promise<void> {
    if (!this.resetForm.valid) {
      console.error("Register Page is not valid:", this.resetForm.value);
    } else {
      const email: string = this.resetForm.value.email;

      this.authService.reset(email).then(() => {
        this.ctrlAlertSuccess();
      }, 
      error => {
        this.ctrlAlertError()
      });
    }
  }
    
  goLoginPage(): void {
    this.router.navigate(['login']);
  }  

}
