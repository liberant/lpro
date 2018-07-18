import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { OrdersProvider } from '../../providers/orders/orders';
import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';


@IonicPage()
@Component({
  selector: 'page-wine-lists',
  templateUrl: 'wine-lists.html',
})
export class WineListsPage {
  productsList: Observable<Product[]>;
  user: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public viewCtrl: ViewController, public toastCtrl: ToastController, public op: OrdersProvider) {
    this.user  = this.afs.user.getValue();
  }

  ionViewDidLoad() {
      this.productsList = this.afs.colWithIds$<Product>(`business/${this.user.busId}/winelist`);
      console.log(this.productsList);
  }

  detail(id: string) {
    this.navCtrl.push('ProductPage', { id });
  }

  order() {
    this.viewCtrl.dismiss();
  }

  async placeOrder(product: Product): Promise<any> {
    await this.op.placeOrder(product);
    this.presentToast(`${product.qty} bottles of ${product.name} ordered`);
  }


  addList(product) {
    this.afs.upsert(`business/${this.user.busId}/winelist/${product.id}`, product).then(res => {
      console.log(res);
      this.presentToast('Wine added successfully');
    });
    this.afs.delete(`business/${this.user.busId}/winelist/${product.id}`);
  }

  contact(id) {
    console.log(id);
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
