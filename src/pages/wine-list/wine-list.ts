import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {FirestoreProvider} from '../../providers/firestore/firestore';
import { AuthProvider } from './../../providers/auth/auth';
import { Storage } from '@ionic/storage';
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
  public orderForm: FormGroup;
  //public prods: FormArray;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public viewCtrl: ViewController, public toastCtrl: ToastController, public op: OrdersProvider, private fb: FormBuilder, private storage: Storage, public auth: AuthProvider ) {
   this.busId = this.auth.busId;
    this.initForm();
  }

  ionViewDidLoad() {
    console.log(this.busId);
    /*this.afs.getBusId().then(busId => {
      this.busId = busId;
      this.productsList = this.afs.col$<Product>('business/' + busId + '/' + this.listType)
    });
    */
   this.getProducts();
  }

  async getProducts() {
    //this.busId = await this.afs.getBusId();
    this.busId = await this.storage.get('busId');
    console.log(this.busId);
    this.productsList = await this.afs.col$<Product>(`business/${this.busId}/winelist`);
    this.productsList.subscribe(res => {
      console.log(res);
      this.initProducts(res);

    })
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

  initForm() {
    this.orderForm = this.fb.group({
      rid: this.busId,
      total: [''],
      prods: this.fb.array([]),
    });
  }

  initProducts(_products) {
  //this.productsList.subscribe(_products => {
    console.log(_products);
    _products.forEach(product => {
      const control = <FormArray>this.orderForm.controls['prods'];
      control.push(
        this.fb.group({
        name: product.name,
        qty: product.qty,
      })
      )
      });
  }
  initProductControl() {
    return this.fb.group({
      name: [''],
      qty: [''],
    });
  } 


  detail(id: string) {
    this.navCtrl.push('ProductPage', {id: id});
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  /*async placeOrder(product: Product): Promise<any> {
    await this.op.placeOrder(product);
    this.presentToast(`${product.qty} bottles of ${product.name} ordered`);
  }*/

placeOrder() {
  console.log(this.orderForm.value);
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