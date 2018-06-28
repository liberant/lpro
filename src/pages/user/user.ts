import { Component, OnInit } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { URLValidator } from '../../validators/url';
import { Observable } from 'rxjs/Observable';
import { UsersProvider } from '../../providers/users/users';

import { User } from '../../models/user-model'


@IonicPage()
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserPage implements OnInit {
  user: Observable<User>;
  userForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder
  ) { }

ionViewDidLoad() {
this.user = this.navParams.get('user');
}

  ngOnInit() {
    
    this.userForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(11), Validators.pattern('[0-9]+')])],
      photoURL: [''],
      busName: [''],
      type: ['', Validators.compose([Validators.required])],
    });
    this.user.subscribe(user =>{
      this.userForm.patchValue(user);
    });
  }

  async setDetails(uid: string) {
    if (!this.userForm.valid) {
      console.log('Form not ready');
    } else {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}