import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from "../../app.component"
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  user = {
    nombre: "",
    correo: "",
    contrasena: "",
    confircontrasena: ""
  };

  constructor(private fcm: FCM, private alertController: AlertController, private navCtrl: NavController, private http: HttpClient, private appControle: AppComponent) { }

  ngOnInit() {
    this.cargarmenu();
  }

  //regresa al login de usuario
  pagRegresar() {
    this.navCtrl.back();
  }

  //registra el usuario por medio del midelware datos usuario
  async registrar() {
    this.fcm.getToken().then(token => {

      let json = JSON.stringify({
        "nombre": this.user.nombre,
        "correo": this.user.correo,
        "password": this.user.contrasena,
        "confirmarPassword": this.user.confircontrasena,
        "token": token
      });
      var valJson = this.validacion(json)
      if (valJson === "ok") {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'my-auth-token'
          })
        };

        this.http.post("http://192.168.20.23:9999/crearUsuario", json, httpOptions)
          .subscribe(data => {
            var response = JSON.parse(JSON.stringify(data));
            if (response.respuesta.includes("fallo la creación")) {
              this.presentAlert(response.respuesta);
            }
            else {
              this.navCtrl.navigateForward("/pages-maps-earthquake")
            }
          }, error => {
            console.log("error")
            console.log(error);
          });
      }
      else {
        this.presentAlert(valJson)
      }
    });


  }

  //muestra un alerta encaso que la validacion del cliente falle
  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Creación Usuario',
      subHeader: 'Falla',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }


  //validacion de campos
  validacion(req) {
    req = JSON.parse(req)
    var response;
    if (req.password === undefined || req.password === "" || req.confirmarPassword === undefined || req.confirmarPassword === "" || req.correo === undefined || req.correo === "" || req.nombre === undefined || req.nombre === "") {
      response = "Todos los campos deben ser completados";
    }
    else if (req.correo.includes("@gmail.com") || req.correo.includes("@hotmail.com")) {
      response = "ok";
    }
    else {
      response = "El formato de correo no es valido";
    }
    return response;
  }

  //permite desabilitar el menu
  cargarmenu() {
    this.appControle.setMenu(true);
  }
}