import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { pushNotification } from './services/pushNotification.services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menu: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private router: Router,
    private notification: pushNotification
  ) {
    this.initializeApp();
    this.mantenersesion();
  }

  //iniciador de la App
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.setMenu(true);

  }
  //funcion de habilitar menu
  setMenu(value: boolean) {
    console.log("cargar menu" + value)
    this.menu = value;
  }

  clickTodosSismos() {
    this.navCtrl.navigateForward("/todos-sismos")
  }
  clickComoActuar() {
    this.navCtrl.navigateForward("/como-actauar");
  }

  //conocer sesion activa
  mantenersesion() {
    if (window.localStorage["sesion"] == "true") {
      this.navCtrl.navigateForward("/pages-maps-earthquake");
      console.log("mantener sesion");
      console.log(window.localStorage["sesion"]);
    }
    else {
      console.log("mantener sesion");
      console.log(window.localStorage["sesion"]);
    }
  }

  //conocer sesion activa
  cambiarEstadoSesion() {
    if (window.localStorage["sesion"] == "true") {
      window.localStorage["sesion"] = false;
      console.log("cambiar sesion");
      console.log(window.localStorage["sesion"]);
    }
    else {
      window.localStorage["sesion"] = true;
      console.log("cambiar sesion");
      console.log(window.localStorage["sesion"]);
    }
  }

  clickCerrarSesion(){
    this.cambiarEstadoSesion();
    this.navCtrl.navigateForward("/login-user");
  }
}
