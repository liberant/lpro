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
let BusinessPage = class BusinessPage {
    constructor(navCtrl, navParams, loadingCtrl, alertCtrl, fb, fs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.fb = fb;
        this.fs = fs;
        this.id = navParams.get('id');
        this.businessForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            // photoURL: [''],
            website: ['', Validators.compose([Validators.required])],
            phone: [''],
            email: [''],
            type: ['', Validators.compose([Validators.required])]
        });
    }
    ionViewDidLoad() {
        if (this.id) {
            this.fs.doc$('business/' + this.id) //.valueChanges()
                .subscribe(data => {
                this.patchForm(data);
            });
            console.log(this.business);
        }
        this.content.resize();
    }
    patchForm(business) {
        this.businessForm.patchValue({
            name: business.name,
            // photoURL: business.photoURL,
            website: business.website,
            phone: business.phone,
            email: business.email,
            type: business.type
        });
    }
    editBusiness() {
        console.log(this.businessForm.value);
        this.fs.upsert('business/' + this.id, this.businessForm.value);
    }
};
__decorate([
    ViewChild('businessProfile'),
    __metadata("design:type", Content)
], BusinessPage.prototype, "content", void 0);
BusinessPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-business',
        templateUrl: 'business.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LoadingController,
        AlertController,
        FormBuilder,
        FirestoreProvider])
], BusinessPage);
export { BusinessPage };
//# sourceMappingURL=business.js.map