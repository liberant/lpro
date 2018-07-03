import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
  wineListsRoot = 'WineListsPage';
  ordersRoot = 'OrdersPage';


  constructor(public navCtrl: NavController) {}

}
