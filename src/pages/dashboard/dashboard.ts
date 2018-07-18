import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Observable } from 'rxjs/Observable';

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

user$: Observable<User>;
userId: string;
busId: string;
type: string;
constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public afs: FirestoreProvider) {
  }

ionViewDidLoad() {
    this.user$ = this.auth.getUser();
}


}
