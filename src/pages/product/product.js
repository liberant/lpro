var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, Content } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { FirestoreProvider } from '../../providers/firestore/firestore';
let ProductPage = class ProductPage {
    constructor(navCtrl, navParams, loadingCtrl, alertCtrl, fb, afs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.fb = fb;
        this.afs = afs;
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
            this.afs.doc$('product/' + this.id) //.valueChanges()
                .subscribe(data => {
                this.patchForm(data);
            });
            console.log(this.product);
        }
        else {
            this.id = this.afs.getId();
            this.productForm.patchValue({ id: this.id });
        }
        this.content.resize();
        this.producerList = this.afs.colWithIds$('business', ref => ref.where('type', '==', 'producer'));
        this.regionList = this.afs.col$('region');
        this.varietyList = this.afs.col$('variety');
    }
    patchForm(product) {
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
        this.productForm.patchValue({ pid: pid });
    }
    editProduct() {
        console.log(this.productForm.value);
        this.afs.upsert('product/' + this.id, this.productForm.value);
    }
};
__decorate([
    ViewChild('productProfile'),
    __metadata("design:type", Content)
], ProductPage.prototype, "content", void 0);
ProductPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-product',
        templateUrl: 'product.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LoadingController,
        AlertController,
        FormBuilder,
        FirestoreProvider])
], ProductPage);
export { ProductPage };
//# sourceMappingURL=product.js.map