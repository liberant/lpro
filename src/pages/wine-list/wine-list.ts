import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';
import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { GroupByPipe, PairsPipe } from 'ngx-pipes';
import { first } from 'rxjs/operator/first';
import { take, tap } from 'rxjs/operators';


@IonicPage() @Component({
  selector: 'page-wine-list', templateUrl: 'wine-list.html', providers: [ GroupByPipe, PairsPipe ],

})
export class WineListPage {
  productsList: Product[];
  user: User;
  orderForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public viewCtrl: ViewController, public toastCtrl: ToastController, public op: OrdersProvider, private fb: FormBuilder, private storage: Storage, public auth: AuthProvider, public groupBy: GroupByPipe, public pairs: PairsPipe) {
    this.user = this.auth.user$.getValue();
    this.op.load(this.user.busId);
  }

  ionViewWillEnter() {
    this.initForm();
    this.getProducts();
  }

  ionViewDidLoad() {

  }

  private updTotal() {
    const control = this.orderForm.controls['prods'] as FormArray;
    let total = 0;
    for (const i in control) {
      console.log(control[i]);
      if (control[i].qty >= 1) {
        const subtotal: number = control[i].qty * control[i].unitCost;
        control.at(i).patchValue({ subtotal, options: { onlySelf: true, emitEvent: false } });
        total += subtotal;
        this.orderForm.patchValue({ total });
      }
    }
  }

  initForm() {
    this.orderForm = this.fb.group({
      rid: this.user.busId, total: 0, prods: this.fb.array([]),
    });
  }

  async getProducts() {
    this.afs.col$(`business/${this.user.busId}/winelist`).pipe(tap(doc => {
      if (doc) {
        this.addControl(doc);
      }
    }), take(1)).subscribe();
    const qtyChanges = this.orderForm.controls[ 'prods' ].valueChanges;
    qtyChanges.subscribe(prods => {
      this.updTotal();
      console.log('qtyChanges: ', prods);
    });
  }

  addControl(product) {
    const control = this.orderForm.controls[ 'prods' ] as FormArray;
    control.push(this.fb.group({
      id: product.id,
      name: product.name,
      producer: product.producer,
      pid: product.pid,
      cartonSize: product.cartonSize,
      unitCost: product.unitCost,
      price: product.cartonSize * product.unitCost,
      qty: product.qty,
      onOrder: product.onOrder,
      subtotal: [ 0 ],
    }));
  }

  initProductControl() {
    return this.fb.group({
      id: [ '' ],
      name: [ '' ],
      producer: [ '' ],
      pid: [ '' ],
      cartonSize: [0],
      unitCost: [0],
      price: [0],
      qty: [0],
      onOrder: [0],
      subtotal: [0],
    });
  }

  detail(id: string) {
    this.navCtrl.push('ProductPage', { id });
  }

  closeModal() {
    this.viewCtrl.dismiss();
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
