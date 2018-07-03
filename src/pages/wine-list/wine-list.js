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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirestoreProvider } from './../../providers/firestore/firestore';
/**
 * Generated class for the WineListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let WineListPage = class WineListPage {
    constructor(navCtrl, navParams, afs, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afs = afs;
        this.viewCtrl = viewCtrl;
        this.type = navParams.get('type');
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad WineListPage');
        this.afs.getBusId().then(busId => {
            console.log(busId);
            this.productsList = this.afs.colWithIds$('business/' + busId + '/' + this.type);
        });
        console.log(this.productsList);
    }
    detail(id) {
        this.navCtrl.push('ProductPage', { id: id });
    }
    closeModal() {
        this.viewCtrl.dismiss();
    }
};
WineListPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-wine-list',
        templateUrl: 'wine-list.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FirestoreProvider, ViewController])
], WineListPage);
export { WineListPage };
//# sourceMappingURL=wine-list.js.map