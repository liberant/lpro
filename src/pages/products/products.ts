import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { Product } from '../../models/product-model';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user-model';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  user: User;
  productsList: Observable<Product[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider, public modalCtrl: ModalController, public toastCtrl: ToastController, public storage: Storage, public auth: AuthProvider) {
    this.user = this.auth.user$.value;
  }


  ionViewWillLoad() {
    console.log(this.user);
    this.getProducts();

  }

  async getProducts() {
    const tid = this.user.busType === 'Retailer' ? 'rid' : 'pid';
    this.productsList = this.user.busType !== 'Producer' ? this.afs.col$<Product>(`product`) : this.afs.col$<Product>(`product`, ref => {
      ref.where (tid, '==', this.user.busId);
    });
  }

  detail(id: string) {
    this.navCtrl.push('ProductPage', { id });
  }

  create() {
    this.navCtrl.push('ProductPage', { pid: this.user.busId });
  }

  openList(type) {
    const listModal = this.modalCtrl.create('ListPage', { type });
    listModal.present();
  }

  async addToList(toList: string, product: Product) {
    console.log(toList, product, this.user);
    const msg = this.afs.upsert(`business/${this.user.busId}/${toList}/${product.id}`, product).then(async res => {
      await this.afs.upsert(`business/${product.pid}/interested/${this.user.busId}`, { id: this.user.busId, name: this.user.busName });
      await this.afs.upsert(`business/${product.pid}/interested/${this.user.busId}/${toList}/${product.id}`, { name: product.name, user: `${this.user.firstName} ${this.user.lastName}` });
    });
    this.presentToast(`${product.name} added successfully to ${toList}`);
    console.log(msg);
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
