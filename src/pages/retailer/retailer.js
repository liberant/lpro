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
import { IonicPage, NavController } from 'ionic-angular';
/**
 * Generated class for the RetailerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let RetailerPage = class RetailerPage {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
        this.dashboardRoot = 'DashboardPage';
        this.productsRoot = 'ProductsPage';
        this.wineListsRoot = 'WineListsPage';
        this.ordersRoot = 'OrdersPage';
    }
};
RetailerPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-retailer',
        templateUrl: 'retailer.html'
    }),
    __metadata("design:paramtypes", [NavController])
], RetailerPage);
export { RetailerPage };
//# sourceMappingURL=retailer.js.map