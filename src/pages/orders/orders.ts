import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { WineListPage } from './../wine-list/wine-list';
import { FirestoreProvider } from './../../providers/firestore/firestore';
import { AuthProvider} from "../../providers/auth/auth";
import { Order } from '../../models/order-model';
import {Product} from "../../models/product-model";
import { OrderByPipe } from 'ngx-pipes';
//import { NgPipesModule } from 'ngx-pipes';


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
  providers: [OrderByPipe],
})
export class OrdersPage {
  public busType;
  public busId: string;
  public ordersList: Observable<Order[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider, public modalCtrl: ModalController, public toastCtrl: ToastController, private auth: AuthProvider, private orderby: OrderByPipe) {
//this.busId = this.auth.busId;
this.busType = this.auth.busType; 
console.log(this.busType);
}

  ionViewDidLoad() {
this.afs.getBusId().then(res=>{
  this.busId = res;
  if (this.busType === 'Retailer'){
  this.ordersList = this.orderby.transform(this.afs.col$<Order>('orders', ref => {
      return ref.where('rid', '==', this.busId);
    }), ['submitted', 'approved', 'shipped', 'received']
  );
  } else if (this.busType === 'Producer') {
    this.ordersList = this.orderby.transform(this.afs.col$<Order>('orders', ref => {
      return ref.where('pid', '==', this.busId);
    })
  );
  } else {
    console.log('All Orders');
    this.ordersList = this.afs.col$<Order>('orders');
  }
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
