import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { OrdersProvider } from '../../providers/orders/orders';
import { DynamicFormArrayModel, DynamicFormControlModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { FormArray, FormGroup } from '@angular/forms';

import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { Business } from '../../models/business-model';
import { WineList } from '../../models/lists-model';
import { OrderForm } from '../../models/order-form-model';


@IonicPage()
@Component({
  selector: 'page-wine-list',
  templateUrl: 'wine-list.html',
})
export class WineListPage {
  user: User;
  business: Business;
  productsList: Observable<Product[]>;
  listType: string;
  formModel: DynamicFormControlModel[] = OrderForm;
  formGroup: FormGroup;
  arrayModel: DynamicFormArrayModel;
  arrayControl: FormArray;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public auth: AuthProvider, public viewCtrl: ViewController, public toastCtrl: ToastController, public op: OrdersProvider, public dfs: DynamicFormService) {
    this.user = this.auth.user$.value;
    this.business = this.auth.business$.value;
  }

  ionViewDidLoad() {
    console.log(this.user);
    this.op.load(this.user.busId);
    if(this.business) {
      console.log(this.business);
      this.formModel = this.dfs.fromJSON([ { businessName: this.business.name, rid: this.business.id, total: 0 } ]);
      this.formGroup = this.dfs.createFormGroup(this.formModel);
    }
    this.productsList = this.afs.col<any>(`business/${this.user.busId}/winelist`).valueChanges();
    this.productsList.subscribe(data => {
      this.arrayModel = this.dfs.findById('products', this.formModel) as DynamicFormArrayModel;
      this.arrayControl = this.dfs.createFormArray(this.arrayModel);
    });
    console.log(this.productsList);
    this.arrayControl = this.formGroup.controls['products'] as FormArray;
    this.arrayModel = this.dfs.findById('products', this.formModel) as DynamicFormArrayModel;

  }

  insert(context: DynamicFormArrayModel, index: number) {
    this.dfs.insertFormArrayGroup(index, this.arrayControl, context);
  }


  detail(id: string) {
    this.navCtrl.push('ProductPage', { id });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  async placeOrder(product: Product): Promise<any> {
    await this.op.placeOrder(product);
    this.presentToast(`${product.qty} bottles of ${product.name} ordered`);
  }


  addList(product: Product, toList: string, from?: string) {
    this.afs.upsert(`business/${this.user.busId}/${toList}/${product.id}`, product).then(res => {
      console.log(res);
      this.presentToast('Wine added successfully');
    });
    (from != null) ? this.afs.delete(`business/${this.user.busId}/${from}/${product.id}`) : this.afs.upsert(`business/${product.pid}/interested/${this.user.busId}`, [{ name: this.user.busName, list: toList }]);
    this.afs.upsert(`business/${product.pid}/interested/${this.user.busId}/${toList}/${product.id}`, { name: product.name, user: `${this.user.firstName} ${this.user.lastName}` });
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
