import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

import { Business } from '../../models/business-model';
import { Order } from '../../models/order-model';
import { Observable } from 'rxjs';
import { Product } from '../../models/product-model';
import { first } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  retailer: Business;
  producer: Business;
  trader: Business;
  order$: Observable<Order>;
  products$: Observable<Product[]>;
  busId: string;
  tid: string;
  orderId: string;
  busType: string;
  focused: string;
  show: {
    variety: boolean;
    region: boolean;
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public op: OrdersProvider, public afs: FirestoreProvider, private auth: AuthProvider, private storage: Storage) {
    this.orderId = navParams.get('id');
  }

  async getUser() {
    this.busType = await this.storage.get('type');
    this.busId = await this.storage.get('busId');
    console.log(this.busType);
    return this.busType;
  }

  async getTrader(tid: string): Promise<Business> {
    console.log(tid);
    const trader = this.afs.doc$<Business>(`business/${tid}`);
      return trader.pipe(first()).toPromise();
  }

  ionViewDidLoad() {
    this.order$ = this.afs.doc$<Order>(`orders/${this.orderId}`);
    this.getData();
  }

  async getData(): Promise<void> {

    await this.getUser();
    let tid: string;
    if (this.busType == 'Producer') { tid = await this.afs.get(`orders/${this.orderId}`, 'rid');
      } else { tid = await this.afs.get(`orders/${this.orderId}`, 'pid'); }
    this.trader = await this.getTrader(tid);
    this.products$ = this.afs.col$(`orders/${this.orderId}/products`);

  }

  toggle(field: string, val: boolean) {
    const date = `${field}Date`;
    return this.afs.change(`orders/${this.orderId}`, { [field]: !val, status: `${field}` }, date);
  }

  prep(order) {
    console.log(order);
  }

}
