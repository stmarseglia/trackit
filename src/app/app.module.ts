import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BackgroundMode } from "@ionic-native/background-mode";

import { MyApp } from './app.component';

import { pages } from "../pages/pages";
import { pipes } from "../pipes/pipes";

@NgModule({
  declarations: [
    MyApp,
    ...pages,
    ...pipes
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...pages
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
