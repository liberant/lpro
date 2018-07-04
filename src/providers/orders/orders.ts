
import { Injectable } from '@angular/core';
import {FirestoreProvider} from '../firestore/firestore';
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
    let newOrder: Order = {
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
    this.afs.update('business/'+rid+'/winelist/'+prod.id, {qty: null});
    return this.afs.set('orders/'+oid, newOrder);
  }

  /*change(ref: string, type: string, val: boolean) {
    console.log(type, val, date)
    return this.afs.change(`orders/${ref}`, { [type]: val}, date);
  }*/
}

