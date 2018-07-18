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
import {OrdersProvider} from "../../providers/orders/orders";
import { Order } from '../../models/order-model';
import { Product} from "../../models/product-model";
import { GroupByPipe, OrderByPipe } from 'ngx-pipes';
// import { NgPipesModule } from 'ngx-pipes';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
  providers: [OrderByPipe, GroupByPipe],
})
export class OrdersPage {
  busType;
  busId: string;
  ordersList: Observable<Order[]>;
  prodList: Observable<Product[]>;
  visOrder: string;
  business: string;
  statusList;
  trader: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: FirestoreProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private auth: AuthProvider,
    private storage: Storage,
    public op: OrdersProvider
  ) {
    this.busId = this.auth.busId;
    this.busType = this.auth.busType;
    this.statusList = [{ order: 1, val: 'Submitted' }, { order: 2, val: 'Approved' }, { order: 3, val: 'Shipped' }, { order: 4, val: 'Received' }];
  }

  async getUser() {
    this.busType = await this.storage.get('type');
    this.busId = await this.storage.get('busId');
  }

  ionViewDidLoad() {

    this.getUser().then(res => {
    this.getOrders();
  });
}

  async getOrders() {
    if (this.busType === 'Retailer') {
      this.business = 'producer';
      this.ordersList = this.afs.col$<Order>('orders', ref => {
          return ref.where('rid', '==', this.busId);
        }),
      console.log(this.ordersList);
    } else if (this.busType === 'Producer') {
      this.business = 'retailer';

      this.ordersList = this.afs.col$<Order>('orders', ref => {
          return ref.where('pid', '==', this.busId);
        });
    } else {
      console.log('All Orders');
      this.ordersList = this.afs.col$<Order>('orders');
    }
  }

  detail(id: string) {
    this.navCtrl.push('OrderPage', { id });
  }

showProducts(oid) {
    if(this.visOrder === oid) {
      this.visOrder = null;
    } else {
      this.visOrder = oid;
      this.prodList = this.afs.col$(`orders/${oid}/products`);
    }
}

  addToList(type: string, order: Order) {
    this.afs
      .upsert('business/' + this.busId + '/' + type + '/' + order.id, order)
      .then(res => {
        this.presentToast('Wine added successfully');
      });
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
