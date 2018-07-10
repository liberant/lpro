import { Producer } from './../../models/business-model';

import { Injectable } from '@angular/core';
import {FirestoreProvider} from '../firestore/firestore';
import {Product} from '../../models/product-model';
import { Order } from '../../models/order-model';

@Injectable()

export class OrdersProvider {

  constructor(public afs: FirestoreProvider) {
    console.log('Hello OrdersProvider Provider');
  }

  async placeProductOrder(prod: Product) {
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
      /*
      prodId: prod.id,
      prodName: prod.name,
      qty: prod.qty,
      price: prod.unitCost,
      */
      total: price,
      orderDate: today,
      approved: false,
      shipped: false,
      received: false,
      status: 'submitted'
    };
    await this.afs.set('orders/'+oid, newOrder);
this.afs.update(`business/${rid}/winelist/${prod.id}`, {qty: null});
  }

  async placeOrder(order) {
    console.log(order);
    const oid = await this.afs.getId();
    let retailer = await this.afs.get(`business/${order.rid}`, 'name');
    let today = new Date();
    let newOrder = {
      id: oid,
      rid: order.rid,
      retailer: retailer,
      pid: order,
      producer: order.producer,
      products: order.prods,
      total: order.total,
      orderDate: today,
      approved: false,
      shipped: false,
      received: false,
      status: 'submitted'
    }
    this.afs.set('orders/'+oid, newOrder);
    order.products.forEach( product => {
      this.afs.update(`business/${order.rid}/winelist/${product.id}`, {qty: null, onOrder: product.qty});
    });
}
async placeProducerOrder(prod, order, total) {
  console.log(prod, order, total);
  const oid = await this.afs.getId();
  let retailer = await this.afs.get(`business/${prod.rid}`, 'name');
  let today = new Date();
  let newOrder = {
    id: oid,
    rid: prod.rid,
    retailer: retailer,
    pid: prod.pid,
    producer: prod.name,
    products: order,
    total: total,
    orderDate: today,
    approved: false,
    shipped: false,
    received: false,
    status: 'submitted'
  }
  this.afs.set('orders/'+oid, newOrder);
  order.forEach( product => {
    this.afs.update(`business/${prod.rid}/winelist/${product.id}`, {qty: null, onOrder: product.qty});
  });
}

  progressOrder(id: string, field: string, val: boolean) {
    let date = `${field}Date`;
    return this.afs.change(`orders/${id}`, { [field]: !val, status: `${field}` }, date);
  }

  /*change(ref: string, type: string, val: boolean) {
    console.log(type, val, date)
    return this.afs.change(`orders/${ref}`, { [type]: val}, date);
  }*/
}

