import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.required])]
    });
  }

  ngOnInit() {
  }

  async ctrlLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 3000
    });
    return await this.loading.present();
  }

  async ctrlAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Algo salio mal!',
      message: 'Revise su correo electrónico o clave.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async loginFirebase(): Promise<void> {
    if (!this.loginForm.valid) {
      console.error("Login Page is not valid:", this.loginForm.value);
    } else {
      const email: string = this.loginForm.value.email;
      const password: string = this.loginForm.value.password;

      this.authService.login(email, password)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.router.navigate(['tabs']);
          });
        },
          error => {
            this.loading.dismiss().then(() => {
              this.ctrlAlert();
            });
          });
      this.ctrlLoading();
    }
  }

  goRegisterPage(): void {
    this.router.navigate(['register']);
  }

  goForgotPage(): void {
    this.router.navigate(['forgot']);
  }

}
