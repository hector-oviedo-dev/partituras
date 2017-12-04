import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PartituraPage } from '../pages/partitura/partitura';
import { EmitPage } from '../pages/emit/emit';
import { OperadetailsemitPage } from '../pages/operadetailsemit/operadetailsemit';
import { OperaPage } from '../pages/opera/opera';

import { AdminPage } from '../pages/admin/admin';
import { OperasemitPage } from '../pages/operasemit/operasemit';
import { OperasPage } from '../pages/operas/operas';
import { UploadPage } from '../pages/upload/upload';
import { ServicesProvider } from '../providers/services/services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EmitPage,
    OperaPage,
    AdminPage,
    UploadPage,
    OperasemitPage,
    OperasPage,
    OperadetailsemitPage,
    PartituraPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EmitPage,
    OperaPage,
    AdminPage,
    UploadPage,
    OperasemitPage,
    OperasPage,
    OperadetailsemitPage,
    PartituraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
  ]
})
export class AppModule {}
