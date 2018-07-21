import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  Content,
  IonicPage,
  NavController, NavParams
} from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';

import { Item } from '../../models/common-model';
import { Producer } from '../../models/business-model';
import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  @ViewChild('productProfile') content: Content;

  id: string;
  pid: string;
  user: User;
  path: string;
  product: Product;
  productForm: FormGroup;
  state: string;
  producerList: Observable<Producer[]>;
  regionList: Observable<Item[]>;
  varietyList: Observable<Item[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public afs: FirestoreProvider,
    public auth: AuthProvider,
  ) {
    this.user = this.auth.user$.getValue();
    this.id = this.navParams.get('id');

  }

  ionViewDidLoad() {
    this.initForm();
    if (this.id) {this.afs.getDoc<Product>(`product/${this.id}`).then(data => {
      this.patchForm(data);
      this.product = data;
    });
                  console.log(this.product);
    } else {
      this.id = this.afs.getId();
      this.productForm.patchValue({ id: this.id });
    }
    this.content.resize();
    this.producerList = this.afs.colWithIds$<Producer>('business', ref => ref.where('type', '==', 'Producer'));
    this.regionList = this.afs.col$<Item>('region');
    this.varietyList = this.afs.col$<Item>('variety');
    if (this.user.busType === 'Retailer') { this.productForm.disable(); }
    }

  initForm() {
      this.productForm = this.fb.group({
        id: [ '' ],
        pid: [ '' ],
        name: [ '', Validators.compose([ Validators.required ]) ],
        producer: [ '', Validators.compose([ Validators.required ]) ], // photoURL: [''],
        brand: [ '' ],
        vintage: [ '', Validators.compose([ Validators.required ]) ],
        region: [ '', Validators.compose([ Validators.required ]) ],
        variety: [ '', Validators.compose([ Validators.required ]) ],
        cartonSize: [ '', Validators.compose([ Validators.required ]) ],
        unitCost: [ '', Validators.compose([ Validators.required ]) ],
      });
    }

  patchForm(product?: Product) {
    this.productForm.patchValue({
      id: product.id,
      pid: product.pid,
      name: product.name,
      producer: product.producer,
      // photoURL: product.photoURL,
      vintage: product.vintage,
      region: product.region,
      variety: product.variety,
      cartonSize: product.cartonSize,
      unitCost: product.unitCost
    });
  }

  updateProducerId(pid) {
    this.productForm.patchValue({ pid });
  }

  submit() {
    console.log(this.productForm.value);
    this.afs.upsert(`product/${this.id}`, this.productForm.value);
    this.navCtrl.pop();
  }

}
