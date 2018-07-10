import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from './../../providers/auth/auth';
import { User } from '../../models/user-model';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

public user: User;
public userId: string;
public busId: string;
public type: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
     this.storage.get('uid').then(res => this.userId = res);
     this.storage.get('busId').then(res => this.busId = res);
     this.storage.get('type').then(res => this.type = res);
     this.user = this.auth.user;
  }


}
