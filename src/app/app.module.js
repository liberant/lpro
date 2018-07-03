var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Pro } from '@ionic/pro';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
Pro.init('080aac60', {
    appVersion: '0.0.1'
});
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { firebaseConfig } from './credentials';
import { LpApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { SettingsProvider } from '../providers/settings/settings';
import { UsersProvider } from '../providers/users/users';
import { FirestoreProvider } from '../providers/firestore/firestore';
let LPErrorHandler = class LPErrorHandler {
    constructor(injector) {
        try {
            this.ionicErrorHandler = injector.get(IonicErrorHandler);
        }
        catch (e) {
            // Unable to get the IonicErrorHandler provider, ensure
            // IonicErrorHandler has been added to the providers list below
        }
    }
    handleError(err) {
        Pro.monitoring.handleNewError(err);
        // Remove this if you want to disable Ionic's auto exception handling
        // in development mode.
        this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    }
};
LPErrorHandler = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Injector])
], LPErrorHandler);
export { LPErrorHandler };
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            LpApp,
            HomePage
        ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(LpApp),
            IonicStorageModule.forRoot(),
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireAuthModule,
            AngularFirestoreModule,
            AngularFireStorageModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            LpApp,
            HomePage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            AuthProvider,
            SettingsProvider,
            UsersProvider,
            FirestoreProvider,
            IonicErrorHandler,
            [{ provide: ErrorHandler, useClass: LPErrorHandler }]
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map