import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AppComponent } from "../../app.component";


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class LoginUserComponent implements OnInit {
  correo: String = "";
  contrasena: String = "";
  constructor(private navCtrl: NavController, private http: HttpClient, private alertController: AlertController, private appControle: AppComponent) { }

  ngOnInit() {
    this.cargarmenu()
  }

  //se dirige a la creacion del usuario
  pagRegistro() {
    this.navCtrl.navigateForward("/create-user")
  }

  //Valida el logeo del usuario
  //llama al midelware Datos Usuario
  //se ser correcto abre todos-sismos y de no ser correcto muestra en alerta
  inicioSesion() {
    let json = JSON.stringify({
      "correo": this.correo,
      "password": this.contrasena
    });
    var valJson = this.validacion(json)
    if (valJson === "ok") {
      try {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'my-auth-token'
          })
        };

        this.http.post("http://192.168.20.23:9999/validarAutenticacion", json, httpOptions)
          .subscribe(data => {
            console.log(data)
            if (data["boolean"]) {
              this.navCtrl.navigateForward("/pages-maps-earthquake")
            }
            else {
              this.presentAlert('el correo o la contraseña no son correctos')
            }
          }, error => {
            console.log("error")
            console.log(error);
          });
      }
      catch (e) {
        console.log("error" + e)
        this.presentAlert('el correo o la contraseña no son correctos')
      }
    }
    else {
      this.presentAlert(valJson)
    }
  }

  //muestra un alerta encaso que la validacion del cliente falle
  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'loging de Usuario',
      subHeader: 'no se pudo validar',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  //se encarga de mostrar el menu, en este caso estara desabilitado
  cargarmenu() {
    this.appControle.setMenu(true);
  }

  //se dirige a recuperar contraseña
  recuperarContrasena() {
    this.navCtrl.navigateForward("/recuperar-constrasena")
  }

  //validacion de campos
  validacion(req) {
    console.log("validacion " + req)
    req = JSON.parse(req)
    var response;
    if (req.correo === "" || req.password === "") {
      response = "No pueden existir campos vacios";
    }
    else if (req.correo.includes("@gmail.com") || req.correo.includes("@hotmail.com")) {
      response = "ok";
    }
    else {
      response = "El formato de correo no es valido";
    }
    console.log("validacion " + response)
    return response;
  }

}
