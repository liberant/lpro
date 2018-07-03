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
import { Storage } from '@ionic/storage';
import { AuthProvider } from './../../providers/auth/auth';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let DashboardPage = class DashboardPage {
    constructor(navCtrl, navParams, storage, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.auth = auth;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');
        this.storage.get('uid').then(res => this.userId = res);
        this.storage.get('busId').then(res => this.busId = res);
        this.storage.get('user').then(res => this.user = res);
    }
};
DashboardPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-dashboard',
        templateUrl: 'dashboard.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, AuthProvider])
], DashboardPage);
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map