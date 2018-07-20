import { Injectable } from '@angular/core';
import {FirestoreProvider} from '../firestore/firestore';
import {Product} from '../../models/product-model';
import { BehaviorSubject } from 'rxjs';
import { Business } from '../../models/business-model';
import { WineList } from '../../models/lists-model';


@Injectable()

export class OrdersProvider {
  wineList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  shortList: BehaviorSubject<WineList> = new BehaviorSubject<WineList>(null);



  constructor(public afs: FirestoreProvider) {
    console.log('Hello OrdersProvider Provider');

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
    };
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
    total: total,
    orderDate: today,
    approved: false,
    shipped: false,
    received: false,
    status: 'submitted'
  };
  this.afs.set('orders/'+oid, newOrder);
  order.forEach( product => {
    this.afs.add(`orders/${oid}/products`, product);
    this.afs.update(`business/${prod.rid}/winelist/${product.id}`, {qty: null, onOrder: product.onOrder + product.qty});
  });
}

  async progressOrder(id: string, field: string, val: boolean, rid?: string, products?: Product[]) {
    let date = `${field}Date`;
    this.afs.change(`orders/${id}`, { [field]: !val, status: `${field}` }, date);
    if (field === 'received') {
      products.forEach( product =>{
        this.afs.get(`business/${rid}/winelist/${product.id}`, 'onOrder').then(res =>{
          this.afs.update(`business/${rid}/winelist/${product.id}`, {onOrder: parseInt(res, 10) - product.qty});
        })
      })

    }
  }

  /*change(ref: string, type: string, val: boolean) {
    console.log(type, val, date)
    return this.afs.change(`orders/${ref}`, { [type]: val}, date);
  }*/
}

