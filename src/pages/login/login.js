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
import { AlertController, IonicPage, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
let LoginPage = class LoginPage {
    constructor(navCtrl, loadingCtrl, alertCtrl, authProvider, formBuilder, storage) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }
    goToSignup() {
        this.navCtrl.push('SignupPage');
    }
    goToPasswordReset() {
        this.navCtrl.push('PasswordResetPage');
    }
    loginUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.loginForm.valid) {
                console.log('Form not ready');
            }
            else {
                let loading = this.loadingCtrl.create();
                loading.present();
                const email = this.loginForm.value.email;
                const password = this.loginForm.value.password;
                try {
                    yield this.authProvider.loginUser(email, password);
                    yield this.authProvider.setIds();
                    yield loading.dismiss();
                    this.navCtrl.setRoot('AdminPage');
                }
                catch (error) {
                    yield loading.dismiss();
                    const alert = this.alertCtrl.create({
                        message: error.message,
                        buttons: [{ text: 'Ok', role: 'cancel' }]
                    });
                    alert.present();
                }
            }
        });
    }
};
LoginPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [NavController,
        LoadingController,
        AlertController,
        AuthProvider,
        FormBuilder,
        Storage])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map