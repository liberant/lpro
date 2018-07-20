import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';

/**
 * Generated class for the RetailerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-retailer',
  templateUrl: 'retailer.html'
})
export class RetailerPage {

  dashboardRoot = 'DashboardPage';
  productsRoot = 'ProductsPage';
  wineListsRoot = 'WineListPage';
  ordersRoot = 'OrdersPage';

  userParams = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider) {

  }
}
