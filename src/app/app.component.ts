import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { FirestoreProvider } from '../providers/firestore/firestore';
import firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class LpApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: {title: string, component: any}[];

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menu: MenuController,
              public auth: AuthProvider,
              public afs: FirestoreProvider,
              public storage: Storage,
            ) {

    this.initializeApp();

    this.pages = [
      { title: 'Admin', component: 'AdminPage' },
      { title: 'Producers', component: 'ProducerPage' },
      { title: 'Retailers', component: 'RetailerPage' }
    ];

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.afs.get(`user/${user.uid}`, 'busType').then(type => {
            this.rootPage = `${type}Page`;
          });
      } else {
        this.rootPage = 'LoginPage';
      }
    }, () => {
      this.rootPage = 'LoginPage';
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
 this.storage.get('user').then((user) => {
   console.log('storage: ' , user)
   this.auth.user$.next(user);
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
