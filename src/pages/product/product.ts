import { Component, ViewChild } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams, Content
} from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { FirestoreProvider } from '../../providers/firestore/firestore';

import { Item } from '../../models/common-model';
import { Producer } from './../../models/business-model';
import { Product } from '../../models/product-model';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  @ViewChild('productProfile') content: Content;

  public id: string;
  product: Product;
  productForm: FormGroup;
  public loading: Loading;
  producerList: Observable<Producer[]>;
  regionList: Observable<Item[]>;
  varietyList: Observable<Item[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public afs: FirestoreProvider
  ) {
    this.id = navParams.get('id');
    this.productForm = this.fb.group({
      id: [''],
      pid: [''],
      name: ['', Validators.compose([Validators.required])],
      producer: ['', Validators.compose([Validators.required])],
           // photoURL: [''],
      brand: [''],
      vintage: ['', Validators.compose([Validators.required])],
      region: ['', Validators.compose([Validators.required])],
      variety: ['', Validators.compose([Validators.required])],
      cartonSize: ['', Validators.compose([Validators.required])],
      unitCost: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    if (this.id) {
      this.afs.doc$<Product>('product/' + this.id) //.valueChanges()
       .subscribe(data =>{
         this.patchForm(data);
       });
       console.log(this.product);   
   } else {
     this.id = this.afs.getId();
     this.productForm.patchValue({id: this.id});
   }
   this.content.resize(); 
   this.producerList = this.afs.colWithIds$<Producer>('business', ref => ref.where('type', '==', 'producer'));
   this.regionList = this.afs.col$<Item>('region');
   this.varietyList = this.afs.col$<Item>('variety')

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
  updprod(pid) {
this.productForm.patchValue({pid: pid});
  }

  editProduct() {
    console.log(this.productForm.value);
    this.afs.upsert('product/'+this.id, this.productForm.value)
  }


}
