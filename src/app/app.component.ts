import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  menu: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.initializeApp();

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


}
