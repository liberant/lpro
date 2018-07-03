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
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
let LpApp = class LpApp {
    constructor(platform, statusBar, splashScreen, menu, afAuth) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.menu = menu;
        this.initializeApp();
        this.pages = [
            { title: 'Admin', component: 'AdminPage' },
            { title: 'Producers', component: 'ProducerPage' },
            { title: 'Retailers', component: 'RetailerPage' }
        ];
        const authListener = afAuth.authState.subscribe(user => {
            if (user) {
                this.rootPage = 'AdminPage';
                authListener.unsubscribe();
            }
            else {
                this.rootPage = 'LoginPage';
                authListener.unsubscribe();
            }
        });
    }
    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }
};
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], LpApp.prototype, "nav", void 0);
LpApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        StatusBar,
        SplashScreen,
        MenuController,
        AngularFireAuth])
], LpApp);
export { LpApp };
//# sourceMappingURL=app.component.js.map