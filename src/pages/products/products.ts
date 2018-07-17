import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Observable} from 'rxjs';
import {FirestoreProvider} from '../../providers/firestore/firestore';
import {AuthProvider} from "../../providers/auth/auth";
import {Product} from '../../models/product-model';
import {Storage} from '@ionic/storage';

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
  public busType: string;
  public busId: string;
  public productsList: Observable<Product[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider, public modalCtrl: ModalController, public toastCtrl: ToastController, public storage: Storage, public auth: AuthProvider) {
this.getUser();
  }
  async getUser(){
    this.busType = await this.storage.get('type');
    this.busId = await this.storage.get('busId');
  }

  ionViewDidLoad() {
    this.getUser().then(u =>
    {
      console.log(this.busType);
      this.getProducts();
    });

  }

  async getProducts(){
    if (this.busType == "Producer") {
      this.productsList = this.afs.col$<Product>('product', ref => ref.where('pid', '==', this.busId));
    } else {
      console.log('no type');
      this.productsList = this.afs.col$<Product>('product');
    }
  }

  detail(id: string) {
    this.navCtrl.push('ProductPage', {id: id});
  }

  create() {
    this.navCtrl.push('ProductPage', {pid: this.busId});
  }

  openList(type) {
    let listModal = this.modalCtrl.create(`${type}ListPage`);
    listModal.present();
    //this.navCtrl.push('WineListPage', {type: type});
  }

  addToList(type: string, product: Product) {
    this.afs.upsert('business/' + this.busId + '/' + type + '/' + product.id, product).then(res => {
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
