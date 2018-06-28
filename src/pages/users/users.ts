import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UsersProvider } from '../../providers/users/users';
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
  usersList: Observable<User[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public up: UsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
this.usersList = this.up.getList(`user`).valueChanges();
  }

  detail(user: User) {
this.navCtrl.push('UserPage', { user: user});
  }

}
