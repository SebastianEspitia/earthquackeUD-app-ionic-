import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-recuperar-constrasena',
  templateUrl: './recuperar-constrasena.component.html',
  styleUrls: ['./recuperar-constrasena.component.scss'],
})
export class RecuperarConstrasenaComponent implements OnInit {
  correo: String = "";
  constructor(private navCtrl: NavController, private http: HttpClient, private alertController: AlertController, private appControle: AppComponent) { }

  ngOnInit() { this.cargarmenu() }

  //se encarga de mostrar el menu, en este caso estara desabilitado
  cargarmenu() {
    this.appControle.setMenu(true);
  }

  
  //Recuperar contraseña
  //llama al midelware Datos Usuario
  recuperarContrasena() {
    let json = JSON.stringify({
      "app":"earthQuakeColUD@gmail.com/rnytcoxptqiggqky",
      "correo": this.correo,
    });
    var valJson = this.validacion(json)
    if (valJson === "ok") {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'my-auth-token'
        })
      };

      this.http.post("http://192.168.20.23:9999/recuperar", json, httpOptions)
        .subscribe(data => {
          var response = JSON.parse(JSON.stringify(data));
          console.log("exitoso");
          console.log(data)
          if (response.respuesta.includes("fallo")) {
            this.presentAlert(response.respuesta);
          }
          else {
            this.mensaje(response.respuesta) 
            this.navCtrl.navigateForward("/login-user")
          }
        }, error => {
          console.log("error")
          console.log(error);
        });
    }
    else {
      this.presentAlert(valJson)
    }
  }

  //validacion de campos
  validacion(req) {
    console.log("validacion " + req)
    req= JSON.parse(req)
    var response;
    if (req.correo.includes("@gmail.com")  || req.correo.includes("@hotmail.com")) {
      response = "ok";
    }
    else {
      response = "El formato de correo no es valido";
    }
    console.log("validacion " + response)
    return response;
  }

  //muestra un alerta encaso que la validacion del cliente falle
  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Recuperar contraseña',
      subHeader: 'no se pudo recuperar la contraseña',
      message: `${mensaje}`,
      buttons: ['OK']
    });
    await alert.present();
  }
  //muestra un mensaje afirmativo 
  async mensaje(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Recuperar contraseña',
      message: `${mensaje}`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
