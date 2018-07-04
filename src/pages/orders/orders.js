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
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { FirestoreProvider } from './../../providers/firestore/firestore';
import { AuthProvider } from "../../providers/auth/auth";
let OrdersPage = class OrdersPage {
    constructor(navCtrl, navParams, afs, modalCtrl, toastCtrl, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afs = afs;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.auth = auth;
        this.busId = this.auth.busId;
    }
    ionViewDidLoad() {
        this.afs.getBusId().then(res => {
            this.busId = res;
            this.ordersList = this.afs.col$('orders', ref => {
                return ref.where('rid', '==', this.busId);
            });
        });
    }
    detail(id) {
        this.navCtrl.push('OrderPage', { id: id });
    }
    addToList(type, order) {
        this.afs.upsert('business/' + this.busId + '/' + type + '/' + order.id, order).then(res => {
            this.presentToast('Wine added successfully');
        });
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
OrdersPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-orders',
        templateUrl: 'orders.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FirestoreProvider, ModalController, ToastController, AuthProvider])
], OrdersPage);
export { OrdersPage };
//# sourceMappingURL=orders.js.map