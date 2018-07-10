import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { WineListPage } from './../wine-list/wine-list';
import { FirestoreProvider } from './../../providers/firestore/firestore';
import { Product } from '../../models/product-model';
import { Storage } from '@ionic/storage';

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
  public busType;
  public busId: string;
  public productsList: Observable<Product[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider, public modalCtrl: ModalController, public toastCtrl: ToastController, public storage: Storage) {
  this.busType = this.storage.get('busType');
  }

  ionViewDidLoad() {
this.afs.getBusId().then(res=>{
  this.busId = res;
});
if (this.busType === 'Producer'){
  this.productsList = this.afs.col$<Product>('product', ref=> ref.where('prodId', '==', this.busId));
}else {
this.productsList = this.afs.col$<Product>('product');
  }
  }
  detail(id: string) {
this.navCtrl.push('ProductPage', { id: id });
  }
  create() {
    this.navCtrl.push('ProductPage');
  }
  openList(type){
    let listModal = this.modalCtrl.create('WineListPage', {type: type});
    listModal.present();
   //this.navCtrl.push('WineListPage', {type: type});
  }
  addToList(type:string, product: Product) {
    this.afs.upsert('business/'+this.busId+'/'+type+'/'+product.id, product).then(res =>{
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
