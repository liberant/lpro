import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { OrdersProvider } from '../../providers/orders/orders';

import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { Business } from '../../models/business-model';


@IonicPage() @Component({
  selector: 'page-wine-list', templateUrl: 'wine-list.html',
})
export class WineListPage {
  user: User;
  business: Business;
  productsList: Observable<Product[]>;
  groupvar = 'region';
  ordervar = 'unitCost';
  showUser = false;
  arrow = 'arrow-dropdown';

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public auth: AuthProvider, public viewCtrl: ViewController, public toastCtrl: ToastController, public op: OrdersProvider) {
    this.user = this.auth.user$.value;
    this.business = this.auth.business$.value;
  }

  ionViewDidLoad() {
    this.op.load(this.user.busId);
    this.productsList = this.op.wineList.asObservable();
  }


  detail(id: string) {
    this.navCtrl.push('ProductPage', { id });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  async saveQty(id: string, qty: number): Promise<void> {
    this.afs.update<Product>(`business/${this.business.id}/winelist/${id}`, { qty })
    this.presentToast(`${qty} bottles were added to yor cart`);
  }

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message, duration: 3000, position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  showuser() {
    return this.showUser = !this.showUser;
  }


  convertToNumber(qty, i) {
    console.log(qty, i);
  }

}
