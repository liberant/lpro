import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ViewController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OrdersProvider } from '../../providers/orders/orders';
import { Product } from '../../models/product-model';
import { GroupByPipe, PairsPipe } from 'ngx-pipes';
import { debounceTime, map, take, tap } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-wine-list',
  templateUrl: 'wine-list.html',
  providers: [GroupByPipe, PairsPipe],
})
export class WineListPage {
  productsList: Observable<Product[]>;
  busId: string;
  orderForm: FormGroup;
  // public prods: FormArray;
  // Firestore Document


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: FirestoreProvider,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public op: OrdersProvider,
    private fb: FormBuilder,
    private storage: Storage,
    public auth: AuthProvider,
    public groupBy: GroupByPipe,
    public pairs: PairsPipe,
  ) {
   this.busId = this.auth.user.busId;
  }

  ionViewWillEnter() {
    this.initForm();
    this.preloadData();
  }

  get prodForms() {
    return this.orderForm.get('prods') as FormArray;
  }

  addProd(product) {

    const prod = this.fb.group({
      id: product.id,
      name: product.name,
      producer: product.producer,
      pid: product.pid,
      cartonSize: product.cartonSize,
      unitCost: product.unitCost,
      price: product.cartonSize * product.unitCost,
      qty: product.qty,
      onOrder: product.onOrder,
    });
    this.prodForms.push(prod);
  }


  preloadData() {
    this.productsList = this.afs.col$<Product>(`business/${this.busId}`);
    this.productsList.pipe(
        tap(doc => {
          if (doc) {
            this.addProd(doc);
            this.orderForm.markAsPristine();
          }
        }),
        take(1)
      )
      .subscribe();
  }


  initForm() {
    this.orderForm = this.fb.group({
      rid: this.busId,
      total: [''],
      prods: this.fb.array([])
    });
  }

  detail(id: string) {
  this.navCtrl.push('ProductPage', { id });
}

  closeModal() {
  this.viewCtrl.dismiss();
}


  placeOrder(form) {
  const control = this.orderForm.controls['prods'] as FormArray;
  const products = [];
  let total = 0;
  const prods = this.orderForm.controls['prods'].value;
  const producers = this.pairs.transform(this.groupBy.transform(prods, 'producer'));
  producers.forEach(prod => {
    console.log(prod);
    const producer = { name: prod[0], pid: prod[1][0].pid, rid: this.orderForm.controls['rid'].value };
    prod[1].forEach(p => {
      if (p.qty == null) {
        control.removeAt(p.key);
      }
      if (p.qty) {
        products.push(p);
        total = total + p.price;
        console.log(total);
      }
    });
    this.op.placeProducerOrder(producer, products, total);

  });

  this.initForm();
  this.getProducts();
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
