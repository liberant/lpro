import { Component } from '@angular/core';
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
  ViewController,
  ToastController
} from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { OrdersProvider } from '../../providers/orders/orders';
import { Product } from '../../models/product-model';
import { User} from '../../models/user-model';
import { GroupByPipe, PairsPipe } from 'ngx-pipes';
import { debounceTime, map, take, tap } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-wine-list',
  templateUrl: 'wine-list.html',
  providers: [GroupByPipe, PairsPipe],
})
export class WineListPage {
  public productsList: Observable<Product[]>;
  public user: User;
  public orderForm: FormGroup;

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
    this.user  = this.afs.user.getValue();

    this.initForm();
    this.preloadData();
  }

  ionViewDidLoad() {

    this.getProducts();
  get prodForms() {
    return this.orderForm.get('prods') as FormArray;
  }

  addProd(product) {
  async getProducts() {
    this.productsList = await this.afs.col$<Product>(
      `business/${this.user.busId}/winelist`
    );
    this.productsList.subscribe(res => {
      this.initProducts(res);
    });

  }

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

  initForm() {
    this.orderForm = this.fb.group({
      rid: this.user.busId,
      total: [''],
      prods: this.fb.array([])
    });
  }

  initProducts(_products: Array<Product>) {
    const control = <FormArray>this.orderForm.controls['prods'];
    _products.forEach(product => {
      control.push(
        this.fb.group({
          id: product.id,
          name: product.name,
          producer: product.producer,
          pid: product.pid,
          cartonSize: product.cartonSize,
          unitCost: product.unitCost,
          price: product.cartonSize * product.unitCost,
          qty: product.qty,
          onOrder: product.onOrder,
        })
      );
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
  initProductControl() {
    return this.fb.group({
      id: [''],
      name: [''],
      producer: [''],
      pid: [''],
      cartonSize: [''],
      unitCost: [''],
      price: [''],
      qty: [''],
      onOrder: [''],
    });
  }

  detail(id: string) {
    this.navCtrl.push('ProductPage', { id: id });
  }
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
    const control = <FormArray>this.orderForm.controls['prods'];
    let products = [];
    let total: number = 0;
    let prods = this.orderForm.controls['prods'].value;
    let producers = this.pairs.transform(this.groupBy.transform(prods, 'producer'));
    producers.forEach(prod => {
      console.log(prod);
      let producer = { name: prod[0], pid: prod[1][0].pid, rid: this.orderForm.controls['rid'].value};
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
    this.initForm();
    this.getProducts();
  }

  contact(id) {
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
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

  toast.present();
}
}
