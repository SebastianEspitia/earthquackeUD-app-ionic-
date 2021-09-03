import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPageMapsEarthquakeComponent } from "../indexPages"
import { AppComponent } from "../../app.component";


declare var google;
@Component({
  selector: 'app-pages-maps-earthquake',
  templateUrl: './pages-maps-earthquake.component.html',
  styleUrls: ['./pages-maps-earthquake.component.scss'],
})
export class PagesMapsEarthquakeComponent implements OnInit {
  itemsHospital;
  sismo = "";
  estado: boolean = false;
  constructor( private menu: MenuController, private popoverController: PopoverController, private navCtrl: NavController, private http: HttpClient, private appControle: AppComponent) { }

  ngOnInit() {
    // this.menu.enable(true, 'first');
    // this.menu.open('first');
    this.obtenerSismo()
    //this.loadMap() 
    this.cargarmenu();
  }
  abrirmenu() {
    console.log("menu abierto");
    this.menu.toggle("first");
    // this.menu.enable(true, 'first');
    // this.menu.open('first');
  }

  // tocame(){
  //   console.log("entre en tocame")
  //   this.presentPopover();
  // }
  async presentPopover(evento) {

    this.popoverController.dismiss({ valores: "sebastian" });
    console.log("popover")
    const popover = await this.popoverController.create({
      component: PopoverPageMapsEarthquakeComponent,
      event: evento,
      mode: "ios"
      //cssClass: 'my-custom-class',
      //translucent: true
    });

    return await popover.present();
  }

  loadMap(Vlat, Vlng, descripcion) {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    //const myLatLng = { lat: parseFloat(Vlat), lng: parseFloat(Vlng) };
    const myLatLng = { lat: parseFloat("4.60971"), lng: parseFloat("-74.08175") };
    var mapOptions = {
      center: myLatLng,
      zoom: 12,
      mapTypeId: 'terrain',
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false
    };
    // create map
    let map = new google.maps.Map(mapEle, mapOptions);
    let service;
    let infoWindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
      position: myLatLng,
      map,
      title: descripcion,
      optimized: false,
    });
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      { location: myLatLng, radius: 500, type: "hospital" },
      (results, status, pagination) => {

        console.log(results)
        if (status !== "OK" || !results) return;
        this.addPlaces(results, myLatLng, map);

      }
    );
  }

  async addPlaces(places, myLatLng, map) {
    const placesList = document.getElementById("hospital")
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    directionsRenderer.setMap(map);
    var locations = [];
    var posiciones = [];
    var Hospitales = [];
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        console.log(place.geometry.name)
        let distancia = await this.obtenerDistancia(myLatLng, place.geometry.location);
        locations.push({
          value: distancia,
          name: place.name,
          addres: place.vicinity.replace("###", "#"),
          icon: place.icon,
          location: place.geometry.location
        });
        posiciones.push(distancia)
      }
    }
    console.log("distancias ")
    console.log(posiciones.sort(function (a, b) { return a - b; }))
    posiciones.sort(function (a, b) { return a - b; })
    for (const posicion of posiciones) {
      for (let i = 0; i < locations.length; i++) {
        if (posicion === locations[i].value) {
          Hospitales.push(locations[i]);
          locations.splice(i, 1)
          console.log(JSON.stringify(locations[i]))
        }
      }
    }
    console.log("hospitales")
    console.log(JSON.stringify(Hospitales))
    for (const Hospital of JSON.parse(JSON.stringify(Hospitales))) {
      const image = {
        url: Hospital.icon!,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      let marker = new google.maps.Marker({
        map,
        icon: image,
        title: Hospital.name!,
        position: Hospital.location,
      });
      let infoWindow = new google.maps.InfoWindow();
      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });

      const li = document.createElement("li")
      li.innerHTML = `<ul><li STYLE="list-style:none" >${Hospital.name!}</li><li STYLE="list-style:none" >direccion ${Hospital.addres!}</li></ul>`;
      placesList.appendChild(li);
      li.addEventListener("click", () => {
        map.setCenter(Hospital.location!);
        this.calculateAndDisplayRoute(directionsService, directionsRenderer, myLatLng, Hospital.location!);
      });
    }
  }
  obtenerDistancia(origen, destino) {
    const service = new google.maps.DistanceMatrixService();
    const request = {
      origins: [origen],
      destinations: [destino],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    // get distance matrix response
    var responseD = service.getDistanceMatrix(request).then((response) => {
      //return response.rows[0].elements[0].distance.text;
      return response.rows[0].elements[0].distance.value;

    });
    return responseD;
  }


  calculateAndDisplayRoute(directionsService, directionsRenderer, origen, destino) {

    directionsService
      .route({
        origin: origen,
        destination: destino,
        // valores de los modos de  desplazamiento DRIVING,WALKING,BICYCLING,TRANSIT
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((response) => {
        console.log("calcular ruta")
        console.log(response)
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

  showHospitales() {
    this.itemsHospital = document.getElementById("hospital");
    console.log("abriri hospitales  " + this.itemsHospital.style.display)
    if (this.itemsHospital.style.display === "none") {
      this.itemsHospital.style.display = "block";
    }
    else {
      this.itemsHospital.style.display = "none";
    }
  }



  obtenerSismo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      })
    };
    this.http.get("http://192.168.20.23:8888/ultimoSismoColombia")
      .subscribe(data => {
        this.sismo = data["respuesta"]
        this.sismo["descripcion"] = this.sismo["descripcion"].split("of")[1];
        this.loadMap(this.sismo["latitud"], this.sismo["longitud"], this.sismo["descripcion"])
        console.log(this.sismo)
      }, error => {
        console.log("error")
        console.log(error);
      });
  }

  clickComoActuar() {
    console.log("como actuar link")
    this.navCtrl.navigateForward("/como-actauar");
  }
  clickTodosSismos() {
    console.log("todos los sismos link")
    this.navCtrl.navigateForward("/todos-sismos");
  }

  //se encarga de mostrar el menu, en este caso estara desabilitado
  cargarmenu() {
    this.appControle.setMenu(false);
  }



}





