import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//paginas
import { LoginUserComponent } from "./pages/indexPages";
import { CreateUserComponent } from "./pages/indexPages";
import { TodosSismosComponent } from "./pages/indexPages";
import { PagesMapsEarthquakeComponent } from "./pages/indexPages";

import { ComoActuarComponent } from "./pages/indexPages"
import { RecuperarConstrasenaComponent } from "./pages/indexPages"
//fin  paginas

//modulos
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
//fin modulos

//FMC
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

//audio
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    CreateUserComponent,
    TodosSismosComponent,
    PagesMapsEarthquakeComponent,
    ComoActuarComponent,
    RecuperarConstrasenaComponent],
  entryComponents: [
    LoginUserComponent,
    CreateUserComponent,
    TodosSismosComponent,
    PagesMapsEarthquakeComponent,
    ComoActuarComponent,
    RecuperarConstrasenaComponent
  ],
  imports: [BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    NativeAudio,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
