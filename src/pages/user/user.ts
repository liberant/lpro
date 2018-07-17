import { Component, ViewChild } from '@angular/core';
import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams, Content
} from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { UsersProvider } from '../../providers/users/users';
import { FirestoreProvider } from '../../providers/firestore/firestore';

import { User } from '../../models/user-model';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  @ViewChild('userProfile') content: Content;

  uid: string;
  user: User;
  userForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public up: UsersProvider,
    public fs: FirestoreProvider
  ) {
    this.uid = navParams.get('uid');
    this.userForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password:['', Validators.compose([Validators.minLength(6)])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      phone: [''],
     // photoURL: [''],
      busName: [''],
      busType: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    if (this.uid) {
      this.fs.doc$<User>('user/' + this.uid) //.valueChanges()
       .subscribe(data =>{
         this.patchForm(data);
       });
       console.log(this.user);
   }
   this.content.resize();
    }


  patchForm(user?: User) {
    this.userForm.patchValue({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
     // photoURL: user.photoURL,
      busName: user.busName,
      busType: user.busType
    });
  }

  editUser() {
    console.log(this.userForm.value);
  }


}
