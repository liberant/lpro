
import { Injectable } from '@angular/core';
import {FirestoreProvider} from '../../providers/firestore/firestore';
import {Product} from '../../models/product-model';
import { Order } from '../../models/order-model';

@Injectable()
export class OrdersProvider {

  constructor(public afs: FirestoreProvider) {
    console.log('Hello OrdersProvider Provider');
  }

  async placeOrder(prod: Product) {
    const oid = await this.afs.getId();
    let rid = await this.afs.getBusId();
    let retailer = await this.afs.get('business/'+rid, 'name');
    let price = prod.qty * prod.unitCost;
    let today = new Date();
    let newOrder = {
      id: oid,
      rid: rid,
      retailer: retailer,
      pid: prod.pid,
      producer: prod.producer,
      prodId: prod.id,
      prodName: prod.name,
      qty: prod.qty,
      price: prod.unitCost,
      total: price,
      orderDate: today,
      approved: false,
      shipped: false,
      received: false
    };
    console.log(newOrder);
    this.afs.update('business/'+rid+'/winelist/'+prod.id, {qty: null});

    return this.afs.set('orders/'+oid, newOrder);
  }
}

