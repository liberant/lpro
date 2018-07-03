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
/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let ProductsPage = class ProductsPage {
    constructor(navCtrl, navParams, afs, modalCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afs = afs;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
    }
    ionViewDidLoad() {
        this.afs.getBusId().then(res => {
            this.busId = res;
        });
        this.productsList = this.afs.col$('product');
    }
    detail(id) {
        this.navCtrl.push('ProductPage', { id: id });
    }
    create() {
        this.navCtrl.push('ProductPage');
    }
    openList(type) {
        let listModal = this.modalCtrl.create('WineListPage', { type: type });
        listModal.present();
        //this.navCtrl.push('WineListPage', {type: type});
    }
    addToList(type, product) {
        this.afs.upsert('business/' + this.busId + '/' + type + '/' + product.id, product).then(res => {
            this.presentToast();
        });
    }
    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Wine added successfully',
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }
};
ProductsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-products',
        templateUrl: 'products.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FirestoreProvider, ModalController, ToastController])
], ProductsPage);
export { ProductsPage };
//# sourceMappingURL=products.js.map