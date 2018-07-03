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
import { UsersProvider } from '../../providers/users/users';
import { FirestoreProvider } from '../../providers/firestore/firestore';
let UserPage = class UserPage {
    constructor(navCtrl, navParams, loadingCtrl, alertCtrl, fb, up, fs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.fb = fb;
        this.up = up;
        this.fs = fs;
        this.uid = navParams.get('uid');
        this.userForm = this.fb.group({
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6)])],
            firstName: ['', Validators.compose([Validators.required])],
            lastName: ['', Validators.compose([Validators.required])],
            phone: [''],
            // photoURL: [''],
            busName: [''],
            busType: ['', Validators.compose([Validators.required])]
        });
    }
    ionViewDidLoad() {
        if (this.uid) {
            this.fs.doc$('user/' + this.uid) //.valueChanges()
                .subscribe(data => {
                this.patchForm(data);
            });
            console.log(this.user);
        }
        this.content.resize();
    }
    patchForm(user) {
        this.userForm.patchValue({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            // photoURL: user.photoURL,
            busName: user.busName,
            busType: user.busType
        });
    }
    editUser() {
        console.log(this.userForm.value);
    }
};
__decorate([
    ViewChild('userProfile'),
    __metadata("design:type", Content)
], UserPage.prototype, "content", void 0);
UserPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-user',
        templateUrl: 'user.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LoadingController,
        AlertController,
        FormBuilder,
        UsersProvider,
        FirestoreProvider])
], UserPage);
export { UserPage };
//# sourceMappingURL=user.js.map