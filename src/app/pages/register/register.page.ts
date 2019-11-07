import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,    
    private authService: AuthService
  ) 
  {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(12), Validators.required])]
    });
  }

  ngOnInit() {
  }

  async ctrlLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading',
      duration: 3000
    });
    return await this.loading.present();
  }

  async ctrlAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Register failed',
      message: 'Not registered successfully',
      buttons: [
            {
                text: 'Ok',
                role: 'cancel'
            }
      ]
    });
    await alert.present();
  }

  async confirmAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Registered successfully!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log("Confirm Cancel:", blah);
          }
        },
        {
          text: 'Home Page',
          handler: () => {
          this.router.navigate(['']);
          }
        }
      ]
    });
    await alert.present();
  }    

  async registerFirebase(): Promise<void> {
    if (!this.registerForm.valid) {
      console.error("Register Page is not valid:", this.registerForm.value);
    } else {
      const email: string = this.registerForm.value.email;
      const password: string = this.registerForm.value.password;

      this.authService.register(email, password)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.confirmAlert();
          });
        })
        .catch( error => {
          this.loading.dismiss().then(() => {
            this.ctrlAlert();
            console.error("Not registered successfully: ", error);
          });
      });
      this.ctrlLoading();
    }
  }

  goLoginPage(): void {
    this.router.navigate(['login']);
  }  

}
