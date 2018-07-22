import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { OrdersProvider } from '../../providers/orders/orders';
import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';

@IonicPage() @Component({
  selector: 'page-list', templateUrl: 'list.html',
})
export class ListPage {
  user: User;
  productsList: Observable<Product[]>;
  listType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public auth: AuthProvider, public viewCtrl: ViewController, public toastCtrl: ToastController, public op: OrdersProvider) {
    this.listType = `${navParams.get('type')}list`;
    this.user = this.auth.user$.value;

  }

  ionViewDidLoad() {
    this.op.load(this.user.busId);
    console.log(this.listType);
    console.log(this.user);
    this.productsList = (this.listType === 'winelist') ? this.op.wineList.asObservable() : this.op.shortList.asObservable();
    console.log(this.productsList);
    // this.productsList = this.afs.colWithIds$<Product>(`business/${this.user.busId}/${this.listType}`);

  }

  detail(id: string) {
    this.navCtrl.push('ProductPage', { id });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  async placeOrder(product: Product): Promise<void> {
    await this.op.placeOrder(product);
    this.presentToast(`${product.qty} bottles of ${product.name} ordered`);
  }


  addList(product: Product, toList: string, from?: string) {
    this.afs.upsert(`business/${this.user.busId}/${toList}/${product.id}`, product).then(res => {
      console.log(res);
      this.presentToast('Wine added successfully');
    });
    (from != null) ? this.afs.delete(`business/${this.user.busId}/${from}/${product.id}`) : this.afs.upsert(`business/${product.pid}/interested/${this.user.busId}`, [ {
      name: this.user.busName,
      list: toList
    } ]);
    this.afs.upsert(`business/${product.pid}/interested/${this.user.busId}/${toList}/${product.id}`, {
      name: product.name,
      user: `${this.user.firstName} ${this.user.lastName}`
    });
  }

  contact(id) {
    console.log(id);
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


}
