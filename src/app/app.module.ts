import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EstimateModalPage } from '../pages/estimate-modal/estimate-modal';
import { SellModalPage } from '../pages/sell-modal/sell-modal';
import { ShareModalPage } from '../pages/share-modal/share-modal';
import { KeystreamProvider } from '../providers/keystream/keystream';
import { ProductProvider } from '../providers/product/product';
import { ChatbotProvider } from '../providers/chatbot/chatbot';
import { EnvVarProvider } from '../providers/env-var/env-var';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EstimateModalPage,
    SellModalPage,
    ShareModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EstimateModalPage,
    SellModalPage,
    ShareModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    KeystreamProvider,
    ProductProvider,
    ChatbotProvider,
    SpeechRecognition,
    EnvVarProvider
  ]
})
export class AppModule { }
