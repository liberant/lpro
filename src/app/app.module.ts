import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Pro } from '@ionic/pro';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

Pro.init('080aac60', {
  appVersion: '0.0.1'
})
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { LpApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    LpApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(LpApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LpApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
