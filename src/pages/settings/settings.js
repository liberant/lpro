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
import { SettingsProvider } from '../../providers/settings/settings';
import { FirestoreProvider } from './../../providers/firestore/firestore';
let SettingsPage = class SettingsPage {
    constructor(navCtrl, navParams, alertCtrl, sp, fs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.sp = sp;
        this.fs = fs;
        this.show = { variety: true, region: true };
    }
    keyEvent(event) {
        console.log(event);
        if (event.keyCode === 13 && this[this.focused] != null) {
            this.add(this.focused);
        }
        event.stopPropagation();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
        this.regionList = this.fs.colWithIds$('region');
        this.varietyList = this.fs.colWithIds$('variety');
    }
    toggleShow(prop) {
        this.show[prop] = !this.show[prop];
    }
    onFocus(target) {
        this.focused = target;
        console.log(this.focused);
    }
    edit(type, item) {
        this.focused = type;
        let prompt = this.alertCtrl.create({
            title: 'Edit ' + type,
            inputs: [
                {
                    name: 'name',
                    value: item.name,
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    },
                },
                {
                    text: 'Save',
                    handler: data => {
                        console.log(data);
                        this.fs.update(type + '/' + item.id, data);
                    },
                },
            ],
        });
        prompt.present();
    }
    add(type) {
        this.fs.add(type, { name: this[type] });
        this[type] = null;
    }
    rem(type, id) {
        let prompt = this.alertCtrl.create({
            title: 'Confirm Deletion',
            message: 'Do you really want to delete this ' + type + '?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.fs.delete(type + '/' + id);
                    }
                }
            ]
        });
        prompt.present();
    }
};
__decorate([
    HostListener('window:keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], SettingsPage.prototype, "keyEvent", null);
SettingsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-settings',
        templateUrl: 'settings.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController, SettingsProvider, FirestoreProvider])
], SettingsPage);
export { SettingsPage };
//# sourceMappingURL=settings.js.map