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
import { UsersProvider } from '../../providers/users/users';
import { FirestoreProvider } from './../../providers/firestore/firestore';
/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let UsersPage = class UsersPage {
    constructor(navCtrl, navParams, up, fs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.up = up;
        this.fs = fs;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad UsersPage');
        this.usersList = this.fs.col$('user');
    }
    detail(uid) {
        this.navCtrl.push('UserPage', { uid: uid });
    }
    create() {
        this.navCtrl.push('UserPage');
    }
};
UsersPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-users',
        templateUrl: 'users.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, UsersProvider, FirestoreProvider])
], UsersPage);
export { UsersPage };
//# sourceMappingURL=users.js.map