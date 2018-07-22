import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { FirestoreProvider } from '../providers/firestore/firestore';
import { Storage } from '@ionic/storage';
import firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class LpApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: { title: string, component: string }[];

  afs: FirestoreProvider;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menu: MenuController, public auth: AuthProvider, afs: FirestoreProvider, public storage: Storage) {
    this.afs = afs;
    this.initializeApp();

    this.pages = [
      { title: 'Admin', component: 'AdminPage' },
      { title: 'Producers', component: 'ProducerPage' },
      { title: 'Retailers', component: 'RetailerPage' }
      ];

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = 'LoginPage';
      } else {
        this.auth.getUserVal('busType').then( type => {
          this.rootPage = `${type}Page`;
        });
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.ready().then(() => {
      this.storage.get('user').then((user) => {
        console.log('storage: ', user);
        this.auth.user$.next(user);
        });
      });
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


}
