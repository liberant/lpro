import { Component } from '@angular/core';
import {
  Alert, AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider} from "../../providers/firestore/firestore";

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
    private storage: Storage,
    public afs: FirestoreProvider,
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
      const loading: Loading = this.loadingCtrl.create();
      loading.present();
      const email: string = this.loginForm.value.email;
      const password: string = this.loginForm.value.password;
      try {
        const auth = await this.authProvider.loginUser(email, password);
        console.log(auth);
        const busType = await this.afs.get(`user/${auth.uid}`,'busType');
        console.log(busType);
        await loading.dismiss();
        console.log(`${busType}Page`);
        this.navCtrl.setRoot(`${busType}Page`);
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
