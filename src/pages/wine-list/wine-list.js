var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { OrdersProvider } from "../../providers/orders/orders";
let WineListPage = class WineListPage {
    constructor(navCtrl, navParams, afs, viewCtrl, toastCtrl, op) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afs = afs;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.op = op;
        this.listType = navParams.get('type');
    }
    ionViewDidLoad() {
        console.log(this.listType);
        this.afs.getBusId().then(busId => {
            this.busId = busId;
            this.productsList = this.afs.colWithIds$('business/' + busId + '/' + this.listType);
        });
    }
    detail(id) {
        this.navCtrl.push('ProductPage', { id: id });
    }
    closeModal() {
        this.viewCtrl.dismiss();
    }
    placeOrder(product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.op.placeOrder(product);
            this.presentToast(product.qty + ' bottles of ' + product.name + ' ordered');
        });
    }
    trackByFn(index, product) {
        return product.id;
    }
    addList(product) {
        this.afs.upsert('business/' + this.busId + '/winelist/' + product.id, product).then(res => {
            this.presentToast('Wine added successfully');
        });
        this.afs.delete('business/' + this.busId + '/winelist/' + product.id);
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
        toast.present();
    }
};
WineListPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-wine-list',
        templateUrl: 'wine-list.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FirestoreProvider, ViewController, ToastController, OrdersProvider])
], WineListPage);
export { WineListPage };
//# sourceMappingURL=wine-list.js.map