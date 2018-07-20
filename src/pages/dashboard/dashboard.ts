import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider} from "../../providers/firestore/firestore";
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

  public user;
  public fireUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public auth: AuthProvider, public afs: FirestoreProvider) {
    this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log(this.user);
    this.fireUser = this.auth.user$.getValue();
  }
}
