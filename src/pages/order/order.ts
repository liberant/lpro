import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

import { Business } from '../../models/business-model';
import { Order } from '../../models/order-model';
import { User } from '../../models/user-model';
import { Observable } from 'rxjs';
import { Product } from '../../models/product-model';


@IonicPage() @Component({
  selector: 'page-order', templateUrl: 'order.html',
})
export class OrderPage {
  retailer: Business;
  producer: Business;
  trader: Observable<Business>;
  order$: Observable<Order>;
  products$: Observable<Product[]>;
  user: User;
  tid: string;
  orderId: string;
  busType: string;
  focused: string;
  show: {
    variety: boolean; region: boolean;
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public op: OrdersProvider, public afs: FirestoreProvider, private auth: AuthProvider, private storage: Storage) {
    this.orderId = navParams.get('id');
    this.user = this.auth.user$.getValue();
  }

  ionViewDidLoad() {
    this.order$ = this.afs.doc$<Order>(`orders/${this.orderId}`);
    this.getData();
  }

  async getData(): Promise<void> {
    this.trader = this.afs.doc$<Business>(`business/${(this.user.busType === 'Retailer') ? this.order$.valueOf()[ 'pid' ] : this.order$.valueOf()[ 'rid]' ]}`);
    this.products$ = this.afs.col$(`orders/${this.orderId}/products`);
  }

  toggle(field: string, val: boolean) {
    const date = `${field}Date`;
    return this.afs.change(`orders/${this.orderId}`, { [ field ]: !val, status: `${field}` }, date);
  }

  prep(order) {
    console.log(order);
  }

}
