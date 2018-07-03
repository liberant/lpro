import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { WineListPage } from './../wine-list/wine-list';
import { FirestoreProvider } from './../../providers/firestore/firestore';
import { AuthProvider} from "../../providers/auth/auth";
import { Order } from '../../models/order-model';
import {Product} from "../../models/product-model";


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  public busId: string;
  ordersList: Observable<Order[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider, public modalCtrl: ModalController, public toastCtrl: ToastController, private auth: AuthProvider) {
this.busId = this.auth.busId  }

  ionViewDidLoad() {
this.afs.getBusId().then(res=>{
  this.busId = res;
  this.ordersList = this.afs.col$<Order>('orders', ref => {
      return ref.where('rid', '==', this.busId);
    });
  });
  }

  detail(id: string) {
    this.navCtrl.push('OrderPage', { id: id });
  }

  addToList(type:string, order: Order) {
    this.afs.upsert('business/'+this.busId+'/'+type+'/'+order.id, order).then(res =>{
      this.presentToast('Wine added successfully');
    })
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
