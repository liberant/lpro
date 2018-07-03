import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the AdminPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {

  dashboardRoot = 'DashboardPage'
  settingsRoot = 'SettingsPage'
  usersRoot = 'UsersPage'
  businessesRoot = 'BusinessesPage'
  productsRoot = 'ProductsPage'
  ordersRoot = 'OrdersPage'


  constructor(public navCtrl: NavController) {}

}
