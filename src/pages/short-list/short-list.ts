import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {FirestoreProvider} from '../../providers/firestore/firestore';
import {Product} from '../../models/product-model';



@IonicPage()
@Component({
  selector: 'page-short-list',
  templateUrl: 'short-list.html',
})
export class ShortListPage {
  public productsList: Observable<Product[]>;
  public busId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public viewCtrl: ViewController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    /*this.afs.getBusId().then(busId => {
      this.busId = busId;
      this.productsList = this.afs.col$<Product>('business/' + busId + '/' + this.listType)
    });
    */
   this.getProducts();
  }

  async getProducts(){
    this.busId = await this.afs.getBusId();
    this.productsList = await this.afs.col$<Product>(`business/${this.busId}/shortlist`);

  }

  /*createItem(product: Product): FormArray {
    return this.fb.array({
    id: product.id,
    pid: product.pid,
    name: product.name,
    producer: product.producer,
    brand: product.brand,
    vintage: product.vintage,
    region: product.region,
    variety: product.variety,
    photoURL: product.photoURL,
    cartonSize: product.cartonSize,
    active: product.active,
    qty: product.qty,
    price: product.cartonSize * product.unitCost,
    });
  } */


  detail(id: string) {
    this.navCtrl.push('ProductPage', {id: id});
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


  async addList(product) {
    let res = await this.afs.upsert(`business/${this.busId}/winelist/${product.id}`, product);
      this.presentToast('Wine added successfully');
      console.log(res);
    this.afs.delete(`business/${this.busId}/shortlist/${product.id}`);
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
