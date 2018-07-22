import { Injectable } from '@angular/core';
import { FirestoreProvider } from '../firestore/firestore';
import { AuthProvider } from '../auth/auth';
import { Product } from '../../models/product-model';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from 'ionic-angular';


@Injectable()

export class OrdersProvider {
  wineList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  shortList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);

  constructor(public afs: FirestoreProvider, public auth: AuthProvider, public toastCtrl: ToastController) {
    console.log('Hello OrdersProvider Provider');
  }

  load(bid): void {
    this.afs.col$<Product>(`business/${bid}/winelist`)
      .subscribe(data => {
        this.wineList.next(data);
      });
    this.afs.col$<Product>(`business/${bid}/shortlist`)
      .subscribe(data => {
        this.shortList.next(data);
      });
  }

  contact(id) {
    console.log(id);
  }


  async placeOrder(order) {
    console.log(order);
    const oid = this.afs.getId();
    const today = new Date();
    const newOrder = {
      id: oid,
      rid: order.rid,
      retailer: order.retailer,
      pid: order.pid,
      producer: order.producer,
      products: order.products,
      total: parseFloat(order.total),
      orderDate: today,
      approved: false,
      shipped: false,
      received: false,
      status: 'submitted'
    };
    this.afs.set('orders/' + oid, newOrder);
    order.products.forEach(product => {
      this.afs.update(`business/${order.rid}/winelist/${product.id}`, { qty: null, onOrder: parseFloat(product.qty + product.onOrder) });
    });
    this.presentToast(`Order successfully placed`);
  }
/*
  async placeProducerOrder(order) {
    console.log(order);
    const oid = this.afs.getId();
    const retailer = await this.afs.get(`business/${order.rid}`, 'name');
    const today = new Date();
    order[ 1 ].forEach(product => {
      // total = total + (product.cartonSize * product.unitCost * product.qty);
      this.afs.add(`orders/${oid}/products`, product);
      this.afs.update(`business/${order.rid}/winelist/${product.id}`, {
        qty: 0, onOrder: product.onOrder + product.qty
      });
    });
    const newOrder = {
      id: oid,
      rid: order.rid,
      retailer,
      pid: order[ 1 ][ 0 ].pid,
      producer: order[ 0 ],
      total: order.total,
      orderDate: today,
      approved: false,
      shipped: false,
      received: false,
      status: 'submitted'
    };
    this.afs.set(`orders/${oid}`, newOrder);

  }
*/
  async progressOrder(id: string, field: string, val: boolean, rid?: string, products?: Product[]) {
    const date = `${field}Date`;
    this.afs.change(`orders/${id}`, { [ field ]: !val, status: `${field}` }, date);
    if (field === 'received') {
      products.forEach(product => {
        this.afs.get(`business/${rid}/winelist/${product.id}`, 'onOrder').then(res => {
          this.afs.update(`business/${rid}/winelist/${product.id}`, { onOrder: parseInt(res, 10) - product.qty });
        });
      });

    }
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

  /*change(ref: string, type: string, val: boolean) {
    console.log(type, val, date)
    return this.afs.change(`orders/${ref}`, { [type]: val}, date);
  }*/
}

