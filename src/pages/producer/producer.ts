import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';

/**
 * Generated class for the ProducerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() @Component({
  selector: 'page-producer', templateUrl: 'producer.html'
})
export class ProducerPage {

  dashboardRoot = 'DashboardPage';
  productsRoot = 'ProductsPage';
  ordersRoot = 'OrdersPage';
  deliveriesRoot = 'DeliveriesPage';


  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider) {
  }
}
