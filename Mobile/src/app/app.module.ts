import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from "@angular/common/http";
import { ColorPickerModule } from 'ngx-color-picker';

import { IonicCommonModule } from "../common";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BulbService, BulbPage } from '../pages/bulb';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	  BulbPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	  HttpClientModule,
	  ColorPickerModule,
	  IonicCommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	BulbPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	  BulbService
  ]
})
export class AppModule {}
