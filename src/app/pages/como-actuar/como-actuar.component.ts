import { Component, Input, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { comoActuar } from "../../../assets/comoActuar/mensajes/comoActuar"
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-como-actuar',
  templateUrl: './como-actuar.component.html',
  styleUrls: ['./como-actuar.component.scss'],
})
export class ComoActuarComponent implements OnInit {

  actuarPasosTipicos;
  listaViaPublica;
  listaVehiculo;
  listaTrabajo;
  listaReuniones;
  itemReuniones;
  itemTrabajo;
  itemVehiculo;
  itemViaPublica;
  titleReuniones;
  titleTrabajo;
  titleVehiculo;
  titleViaPublica;

  constructor(private navCtrl: NavController, private appControle: AppComponent, private menu: MenuController) {
  }

  ngOnInit() {
    this.menu.close();
    this.cargarInforActuar()
    this.itemReuniones = document.getElementById("itemReuniones");
    this.titleReuniones = document.getElementById("tituloReuniones");
    this.itemTrabajo = document.getElementById("itemTrabajo");
    this.titleTrabajo = document.getElementById("tituloTrabajo");
    this.itemVehiculo = document.getElementById("itemVehiculo");
    this.titleVehiculo = document.getElementById("tituloVehiculo")
    this.itemViaPublica = document.getElementById("itemViaPublica");
    this.titleViaPublica = document.getElementById("tituloViaPublica")
    this.cargarmenu();
  }

  //depliega el menu al precionar el boton
  abrirmenu() {
    this.menu.toggle("first");
  }

  // carga la informacion de como actuar
  cargarInforActuar() {
    this.actuarPasosTipicos = comoActuar["pasosTipicos"];
    this.listaViaPublica = comoActuar["situacion"]["viaPublica"];
    this.listaVehiculo = comoActuar["situacion"]["vehiculo"];
    this.listaTrabajo = comoActuar["situacion"]["trabajo"];
    this.listaReuniones = comoActuar["situacion"]["reuniones"];
  }

  //despliegue el listado segun la seleccion realizada en el front
  estadosListado(elemento: string) {
    switch (elemento) {
      case ("viaPublica"):
        if (this.itemViaPublica.style.display === "block") {
          this.viaPublicaitems(false)
          this.viaPublicaTitulo(true)
          this.reunionesTitulo(true)
          this.trabajoTitulo(true)
          this.vehiculoTitulo(true)
        }
        else {
          this.viaPublicaitems(true)
          this.vehiculoitems(false)
          this.trabajoitems(false)
          this.reunionesitems(false)
          this.viaPublicaTitulo(true)
          this.reunionesTitulo(false)
          this.trabajoTitulo(false)
          this.vehiculoTitulo(false)
        }
        break;
      case ("vehiculo"):
        if (this.itemVehiculo.style.display === "block") {
          this.vehiculoitems(false)
          this.viaPublicaTitulo(true)
          this.reunionesTitulo(true)
          this.trabajoTitulo(true)
          this.vehiculoTitulo(true)
        }
        else {
          this.viaPublicaitems(false)
          this.vehiculoitems(true)
          this.trabajoitems(false)
          this.reunionesitems(false)
          this.viaPublicaTitulo(false)
          this.reunionesTitulo(false)
          this.trabajoTitulo(false)
          this.vehiculoTitulo(true)
        }
        break;
      case ("trabajo"):
        if (this.itemTrabajo.style.display === "block") {
          this.trabajoitems(false)
          this.viaPublicaTitulo(true)
          this.reunionesTitulo(true)
          this.trabajoTitulo(true)
          this.vehiculoTitulo(true)
        }
        else {
          this.viaPublicaitems(false)
          this.vehiculoitems(false)
          this.trabajoitems(true)
          this.reunionesitems(false)
          this.viaPublicaTitulo(false)
          this.reunionesTitulo(false)
          this.trabajoTitulo(true)
          this.vehiculoTitulo(false)
        }
        break;
      case ("reuniones"):
        if (this.itemReuniones.style.display === "block") {
          this.reunionesitems(false)
          this.viaPublicaTitulo(true)
          this.reunionesTitulo(true)
          this.trabajoTitulo(true)
          this.vehiculoTitulo(true)
        }
        else {
          this.viaPublicaitems(false)
          this.vehiculoitems(false)
          this.trabajoitems(false)
          this.reunionesitems(true)
          this.viaPublicaTitulo(false)
          this.reunionesTitulo(true)
          this.trabajoTitulo(false)
          this.vehiculoTitulo(false)
        }
        break;

    }
  }

  //muestra los item de como actuar de reuniones
  reunionesitems(estado) {
    if (estado) {
      this.itemReuniones.style.display = "block";
      this.titleReuniones.style.color = "#080808";

    }
    else {
      this.itemReuniones.style.display = "none";
      this.titleReuniones.style.color = "#e8e0d9";
    }
  }
  //muestra los item de como actuar de trabajo
  trabajoitems(estado) {
    if (estado) {
      this.itemTrabajo.style.display = "block";
    }
    else {
      this.itemTrabajo.style.display = "none";
    }
  }
  //muestra los item de como actuar de vehiculos
  vehiculoitems(estado) {
    if (estado) {
      this.itemVehiculo.style.display = "block";
    }
    else {
      this.itemVehiculo.style.display = "none";
    }
  }
  //muestra los item de como actuar de via publica
  viaPublicaitems(estado) {
    if (estado) {
      this.itemViaPublica.style.display = "block";
    }
    else {
      this.itemViaPublica.style.display = "none";
    }
  }
  // cambia de color los itemes de no corresponde a reuniones
  reunionesTitulo(estado) {
    if (estado) {
      this.titleReuniones.style.color = "#080808";
    }
    else {
      this.titleReuniones.style.color = "#e8e0d9";
    }
  }
  // cambia de color los itemes de no corresponde a trabajo
  trabajoTitulo(estado) {
    if (estado) {
      this.titleTrabajo.style.color = "#080808";
    }
    else {
      this.titleTrabajo.style.color = "#e8e0d9";
    }
  }
  // cambia de color los itemes de no corresponde a vehiculo
  vehiculoTitulo(estado) {
    if (estado) {
      this.titleVehiculo.style.color = "#080808";
    }
    else {
      this.titleVehiculo.style.color = "#e8e0d9";
    }
  }
  // cambia de color los itemes de no corresponde a via publica
  viaPublicaTitulo(estado) {
    if (estado) {
      this.titleViaPublica.style.color = "#080808";
    }
    else {
      this.titleViaPublica.style.color = "#e8e0d9";
    }
  }

  //se encarga de mostrar el menu, en este caso estara desabilitado
  cargarmenu() {
    this.appControle.setMenu(false);
  }
  backpage() {
    this.navCtrl.back();
  }

}
