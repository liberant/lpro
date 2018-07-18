import { Injectable } from '@angular/core';
import { FirestoreProvider } from '../firestore/firestore';
import { ToastController } from 'ionic-angular';
import { Product } from '../../models/product-model';
import { first } from 'rxjs/operators';

@Injectable()

export class OrdersProvider {

  constructor(public afs: FirestoreProvider, public toastCtrl: ToastController) {
    console.log('Hello OrdersProvider Provider');
  }

  async placeProductOrder(prod: Product) {
    const oid = await this.afs.getId();
    const rid = await this.afs.getBusId();
    const retailer = await this.afs.get('business/' + rid, 'name');
    const price = prod.qty * prod.unitCost;
    const today = new Date();
    const newOrder = {
      id: oid,
      rid,
      retailer,
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
    await this.afs.set('orders/' + oid, newOrder);
    this.afs.update(`business/${rid}/winelist/${prod.id}`, { qty: null });
  }

  async placeOrder(order) {
    console.log(order);
    const oid = await this.afs.getId();
    const retailer = await this.afs.get(`business/${order.rid}`, 'name');
    const today = new Date();
    const newOrder = {
      id: oid,
      rid: order.rid,
      retailer,
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
    this.afs.set('orders/' + oid, newOrder);
    order.products.forEach(product => {
      this.afs.update(`business/${order.rid}/winelist/${product.id}`, { qty: null, onOrder: product.qty });
    });
}
  async placeProducerOrder(prod, order, total) {
  console.log(prod, order, total);
  const oid = await this.afs.getId();
  const retailer = await this.afs.get(`business/${prod.rid}`, 'name');
  const today = new Date();
  const newOrder = {
    id: oid,
    rid: prod.rid,
    retailer,
    pid: prod.pid,
    producer: prod.name,
    total,
    orderDate: today,
    approved: false,
    shipped: false,
    received: false,
    status: 'submitted'
  };
  this.afs.set('orders/' + oid, newOrder);
  order.forEach(product => {
    this.afs.add(`orders/${oid}/products`, product);
    this.afs.update(`business/${prod.rid}/winelist/${product.id}`, { qty: null, onOrder: product.onOrder + product.qty });
  });
}

  async progressOrder(id: string, field: string, val: boolean, rid?: string) {
    const date = `${field}Date`;
    this.afs.change(`orders/${id}`, { [field]: !val, status: `${field}` }, date);
    if (field === 'received') {
      const products = await this.afs.col$<Product>(`orders/${id}/products`).pipe(first()).toPromise();
      products.forEach(product => {
        this.afs.get(`business/${rid}/winelist/${product.id}`, 'onOrder').then(res => {
          this.afs.update(`business/${rid}/winelist/${product.id}`, { onOrder: parseInt(res, 10) - product.qty });
        });
      });

    }
    this.presentToast(`Order ${field}`);
  }
/*

return trader.pipe(first()).toPromise();
  async approveOrder(id): Promise<void> {
   const status = await this.afs.change(`orders/${id}`, { approved: true, status: 'approved' } , 'approvedDate');
   return this.presentToast(status);
  }

  async shipOrder(id) {
    const status = await this.afs.change(`orders/${id}`, { shipped: true, status: 'shipped' } , 'shippedDate');
    return this.presentToast(status);
  }

  async receiveOrder(id, pid) {

  }
  */

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /*change(ref: string, type: string, val: boolean) {
    console.log(type, val, date)
    return this.afs.change(`orders/${ref}`, { [type]: val}, date);
  }*/
}

