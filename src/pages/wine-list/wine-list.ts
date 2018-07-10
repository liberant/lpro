import { Order } from './../../models/order-model';
import { Producer } from "./../../models/business-model";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ToastController
} from "ionic-angular";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { FirestoreProvider } from "../../providers/firestore/firestore";
import { AuthProvider } from "./../../providers/auth/auth";
import { Storage } from "@ionic/storage";
import { OrdersProvider } from "../../providers/orders/orders";
import { Product } from "../../models/product-model";
import { GroupByPipe, PairsPipe } from 'ngx-pipes';
import { forEach } from '@firebase/util/dist/esm/src/obj';


@IonicPage()
@Component({
  selector: "page-wine-list",
  templateUrl: "wine-list.html",
  providers: [GroupByPipe, PairsPipe],

})
export class WineListPage {
  public productsList: Observable<Product[]>;
  public busId: string;
  public orderForm: FormGroup;
  //public prods: FormArray;

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
    this.initForm();
  }

  ionViewDidLoad() {
    /*this.afs.getBusId().then(busId => {
      this.busId = busId;
      this.productsList = this.afs.col$<Product>('business/' + busId + '/' + this.listType)
    });
    */
    this.getProducts();
  }

  async getProducts() {
    //this.busId = await this.afs.getBusId();
    //this.busId = await this.storage.get('busId');
    this.productsList = await this.afs.col$<Product>(
      `business/${this.busId}/winelist`
    );
    this.productsList.take(1),( res => {
      this.initProducts(res);
    });
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
      total: [""],
      prods: this.fb.array([])
    });
  }

  initProducts(_products: Array<Product>) {
    const control = <FormArray>this.orderForm.controls["prods"];
    /*if(_products) {
      control.reset();
    }*/
    //this.productsList.subscribe(_products => {
    //console.log(_products);
    _products.forEach(product => {
      if(product.name != null) {
      control.push(
        this.fb.group({
          id: product.id,
          name: product.name,
          producer: product.producer,
          pid: product.pid,
          cartonSize: product.cartonSize,
          unitCost: product.unitCost,
          price: product.cartonSize * product.unitCost,
          qty: product.qty
        })
      );
    }
    });
  }
  initProductControl() {
    return this.fb.group({
      id: [""],
      name: [""],
      producer: [""],
      pid: [""],
      cartonSize: [""],
      unitCost: [""],
      price: [""],
      qty: [""]
    });
  }

  detail(id: string) {
    this.navCtrl.push("ProductPage", { id: id });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  /*async placeOrder(product: Product): Promise<any> {
    await this.op.placeOrder(product);
    this.presentToast(`${product.qty} bottles of ${product.name} ordered`);
  }*/

  placeOrder(form) {
    const control = <FormArray>this.orderForm.controls["prods"];
    let products = [];
    let total: number = 0;
    let prods = this.orderForm.controls["prods"].value;
    let producers = this.pairs.transform(this.groupBy.transform(prods, 'producer'));
    producers.forEach(prod => {
      console.log(prod);
      let producer = { name: prod[0], pid: prod[1][0].pid, rid: this.orderForm.controls['rid'].value}
      prod[1].forEach(p => {
      if (p.qty == null) {
        control.removeAt(p.key);
      }
      if (p.qty) {
        products.push(p)
        total = total + p.price;
        console.log(total);
      }
    });
    let ptotal = ({ total: total });
    this.op.placeProducerOrder(producer, products, ptotal);

  })

    //this.op.producerOrder()

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
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
