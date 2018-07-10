import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {FirestoreProvider} from '../../providers/firestore/firestore';
import { OrdersProvider} from "../../providers/orders/orders";
import {Product} from '../../models/product-model';


@IonicPage()
@Component({
  selector: 'page-wine-lists',
  templateUrl: 'wine-lists.html',
})
export class WineListsPage {
  public productsList: Observable<Product[]>;
  public busId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public viewCtrl: ViewController, public toastCtrl: ToastController, public op: OrdersProvider ) {
  }

  ionViewDidLoad() {
    this.afs.getBusId().then(res => {
      console.log(res);
      this.busId = res;
      this.productsList = this.afs.colWithIds$<Product>(`business/${res}/winelist`);
      console.log(this.productsList);
    });
  }

  detail(id: string) {
    this.navCtrl.push('ProductPage', {id: id});
  }

  order() {
    this.viewCtrl.dismiss();
  }

  async placeOrder(product: Product): Promise<any> {
    await this.op.placeOrder(product);
    this.presentToast(`${product.qty} bottles of ${product.name} ordered`);
  }


  addList(product) {
    this.afs.upsert('business/'+this.busId+'/winelist/'+product.id, product).then(res =>{
      console.log(res);
      this.presentToast('Wine added successfully');
    });
    this.afs.delete('business/'+this.busId+'/winelist/'+product.id);
  }

  contact(id){
    console.log(id);
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
