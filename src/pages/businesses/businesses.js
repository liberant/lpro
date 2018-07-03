var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreProvider } from './../../providers/firestore/firestore';
/**
 * Generated class for the BusinesssPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let BusinessesPage = class BusinessesPage {
    constructor(navCtrl, navParams, fs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fs = fs;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad BusinessPage');
        this.businessesList = this.fs.col$('business');
    }
    detail(id) {
        this.navCtrl.push('BusinessPage', { id: id });
    }
    create() {
        this.navCtrl.push('BusinessPage');
    }
};
BusinessesPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-businesses',
        templateUrl: 'businesses.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FirestoreProvider])
], BusinessesPage);
export { BusinessesPage };
//# sourceMappingURL=businesses.js.map