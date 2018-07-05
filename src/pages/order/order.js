var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrdersProvider } from '../../providers/orders/orders';
import { FirestoreProvider } from './../../providers/firestore/firestore';
import { AuthProvider } from "../../providers/auth/auth";
let OrderPage = class OrderPage {
    constructor(navCtrl, navParams, alertCtrl, op, afs, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.op = op;
        this.afs = afs;
        this.auth = auth;
        this.busId = auth.busId;
        this.orderId = navParams.get('id');
    }
    keyEvent(event) {
        console.log(event);
        if (event.keyCode === 13 && this[this.focused] != null) {
            //this.add(this.focused)
        }
        event.stopPropagation();
    }
    ionViewDidLoad() {
        console.log(this.orderId);
        this.order$ = this.afs.doc$('orders/' + this.orderId);
        this.afs.doc$('orders/' + this.orderId).subscribe(data => {
            this.getData(data.rid, data.pid);
            console.log(data);
        });
    }
    getData(rid, pid) {
        this.afs.doc$('business/' + rid).subscribe(retdata => {
            this.retailer = retdata;
        });
        this.afs.doc$('business/' + pid).subscribe(prodata => {
            this.producer = prodata;
        });
    }
    onFocus(target) {
        this.focused = target;
        console.log(this.focused);
    }
    toggle(field) {
        console.log(field);
        return this.afs.update(`orders/${this.orderId}`, { [field]: field });
    }
};
__decorate([
    HostListener('window:keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], OrderPage.prototype, "keyEvent", null);
OrderPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-order',
        templateUrl: 'order.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController, OrdersProvider, FirestoreProvider, AuthProvider])
], OrderPage);
export { OrderPage };
//# sourceMappingURL=order.js.map