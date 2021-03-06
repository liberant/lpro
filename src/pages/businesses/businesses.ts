import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Business } from '../../models/business-model';

/**
 * Generated class for the BusinessesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-businesses',
  templateUrl: 'businesses.html',
})
export class BusinessesPage {
  businessesList: Observable<Business[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fs: FirestoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
this.businessesList = this.fs.col$<Business>('business');
  }

  detail(id: string) {
this.navCtrl.push('BusinessPage', { id: id });
  }
  create() {
    this.navCtrl.push('BusinessPage');
  }

}
