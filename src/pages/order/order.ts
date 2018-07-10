import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import {AuthProvider} from "../../providers/auth/auth";

import { Business} from "../../models/business-model";
import { Order } from '../../models/order-model';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  retailer: Business;
  producer: Business;
  order$: Observable<Order>;
  busId: string;
  orderId: string;
  busType: string;
  focused: string;
  show: {
    variety: boolean;
    region: boolean;
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public op: OrdersProvider, public afs: FirestoreProvider, private auth: AuthProvider) {
    this.busId = auth.busId;
    this.orderId = navParams.get('id');
  }

  ionViewDidLoad() {
this.order$ = this.afs.doc$<Order>('orders/'+this.orderId);
    this.afs.doc$<Order>('orders/'+this.orderId).subscribe(data => {
      this.getData(data.rid, data.pid);
    });

  }

  getData(rid, pid) {

    this.afs.doc$<Business>('business/'+rid).subscribe(retdata =>{
      this.retailer = retdata;
    })
    this.afs.doc$<Business>('business/'+pid).subscribe(prodata => {
      this.producer = prodata;
    })
  }

  toggle(field: string, val: boolean) {
    let date = `${field}Date`;
    return this.afs.change(`orders/${this.orderId}`, { [field]: !val, status: `${field}` }, date);
  }

}
