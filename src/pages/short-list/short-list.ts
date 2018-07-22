import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage() @Component({
  selector: 'page-short-list', templateUrl: 'short-list.html',
})
export class ShortListPage {
  productsList: Observable<Product[]>;
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public viewCtrl: ViewController, public toastCtrl: ToastController, public auth: AuthProvider) {
    this.user = this.auth.user$.getValue();
  }

  ionViewDidLoad() {

    this.getProducts();
  }

  async getProducts() {
    this.productsList = this.afs.col$<Product>(`business/${this.user.busId}/shortlist`);

  }


  detail(id: string) {
    this.navCtrl.push('ProductPage', { id });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


  async addList(product) {
    const res = await this.afs.upsert(`business/${this.user.busId}/winelist/${product.id}`, product);
    this.presentToast('Wine added successfully');
    console.log(res);
    this.afs.delete(`business/${this.user.busId}/shortlist/${product.id}`);
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
