import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { AngularFireAuth } from 'angularfire2/auth';
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
             // afAuth: AngularFireAuth,
              public auth: AuthProvider,
              public afs: FirestoreProvider
            ) {

    this.initializeApp();

    this.pages = [
      { title: 'Admin', component: 'AdminPage' },
      { title: 'Producers', component: 'ProducerPage' },
      { title: 'Retailers', component: 'RetailerPage' }
    ];

    const authstate = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('app: ', user);
        this.afs.get(`user/${user.uid}`, 'busType'). then(type => {
            console.log(type);
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


}
