import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UsersProvider } from '../../providers/users/users';
import { FirestoreProvider } from './../../providers/firestore/firestore';
import { User } from '../../models/user-model';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  usersList: Observable<User[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public up: UsersProvider, public fs: FirestoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
this.usersList = this.fs.col$<User>('user');
  }

  detail(uid: string) {
this.navCtrl.push('UserPage', { uid: uid });
  }
  create() {
    this.navCtrl.push('UserPage');
  }

}
