import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {FirestoreProvider} from '../../providers/firestore/firestore';
import { OrdersProvider} from "../../providers/orders/orders";
import {Product} from '../../models/product-model';


@IonicPage()
@Component({
  selector: 'page-wine-list',
  templateUrl: 'wine-list.html',
})
export class WineListPage {
  public productsList: Observable<Product[]>;
  public busId: string;
  public listType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public viewCtrl: ViewController, public toastCtrl: ToastController, public op: OrdersProvider ) {
    this.listType = navParams.get('type');
  }

  ionViewDidLoad() {
    console.log(this.listType);
    this.afs.getBusId().then(busId => {
      this.busId = busId;
      this.productsList = this.afs.colWithIds$<Product>('business/' + busId + '/' + this.listType);
    });
  }

  detail(id: string) {
    this.navCtrl.push('ProductPage', {id: id});
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  async placeOrder(product: Product): Promise<any> {
    return await this.op.placeOrder(product);
    this.presentToast(product.qty +  ' bottles of ' + product.name + ' ordered');
  }


  trackByFn(index, product) {
    return product.id;
  }

  addList(product) {
    this.afs.upsert('business/'+this.busId+'/winelist/'+product.id, product).then(res =>{
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
