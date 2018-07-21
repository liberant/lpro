import { Component } from '@angular/core';
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { Order } from '../../models/order-model';
import { GroupByPipe, OrderByPipe } from 'ngx-pipes';
import { User } from '../../models/user-model';
// import { NgPipesModule } from 'ngx-pipes';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
  providers: [OrderByPipe, GroupByPipe],
})
export class OrdersPage {
  user: User;
  ordersList: Observable<Order[]>;
  business: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider, public modalCtrl: ModalController, public toastCtrl: ToastController, private auth: AuthProvider, private storage: Storage, private orderby: OrderByPipe, private groupby: GroupByPipe,) {
    this.user = this.auth.user$.getValue();
  }


  ionViewWillLoad() {

    this.getOrders();
}

  async getOrders() {
if (this.user.busType === 'Admin') {
  this.ordersList = this.afs.col$<Order>('orders');
} else {
  console.log(this.user);
  this.ordersList = this.afs.col$<Order>('orders', ref => {
          return ref.where((this.user.busType === 'Retailer') ? 'rid' : 'pid', '==', this.user.busId);
        });
    }
  }

  detail(id: string) {
    this.navCtrl.push('OrderPage', { id });
  }

  async addToList(type: string, order: Order) {
    const newProd = this.afs.upsert(`business/${this.user.busId}/${type}/${order.id}`, order);
    this.presentToast(`${newProd} added successfully`);
  }
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
}
