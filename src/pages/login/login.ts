import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    private formBuilder: FormBuilder,
    private storage: Storage
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  goToPasswordReset(): void {
    this.navCtrl.push('PasswordResetPage');
  }

  async loginUser(): Promise<any> {
    if (!this.loginForm.valid) {
      console.log('Form not ready');
    } else {
      let loading: Loading = this.loadingCtrl.create();
      loading.present();
      const email: string = this.loginForm.value.email;
      const password: string = this.loginForm.value.password;
      try {
        const user = await this.authProvider.loginUser(email, password);
        console.log(user);
        await this.authProvider.setIds(user.uid);
        await loading.dismiss();
        console.log(`${this.authProvider.user.busType}Page`);
        this.navCtrl.setRoot(`${this.authProvider.user.busType}Page`);
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      }
    }
  }

}
