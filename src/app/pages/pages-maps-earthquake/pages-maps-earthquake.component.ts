import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from "../../app.component";
import { UpperCasePipe } from '@angular/common';


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
  constructor(private route: ActivatedRoute, private router: Router, private menu: MenuController, private popoverController: PopoverController, private navCtrl: NavController, private http: HttpClient, private appControle: AppComponent, private platform: Platform) { }

  ngOnInit() {
    this.obtenerSismo()
    this.blockbackbutton()
    this.cargarmenu();
  }

  //bloquea el boton de atras de los Android 
  blockbackbutton() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
        }, false);
      });

    });
  }

  abrirmenu() {
    this.menu.toggle("first");
  }


  loadMap(Vlat, Vlng, descripcion) {
    // obtiene el elemento HTML
    const mapEle: HTMLElement = document.getElementById('map');
    // crea la posicion
    const myLatLng = { lat: parseFloat(Vlat), lng: parseFloat(Vlng) };

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
    //muestra el nombre de centro telurico
    infoWindow.setContent(marker.getTitle());
    infoWindow.open(marker.getMap(), marker);

    //muestra el nombre de centro telurico al darle click 
    marker.addListener("click", () => {
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      { location: myLatLng, radius: 5000, type: "hospital" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) { console.log("no hay hospitales") }

        this.addPlaces(results, myLatLng, map, "hos");

        if (results.length <= 3) {
          service.nearbySearch(
            { location: myLatLng, radius: 500000, type: "city_hall" },
            (results, status, pagination) => {
              if (status !== "OK" || !results) { console.log("no hay ciudades") }

              this.addPlaces(results, myLatLng, map, "city");

            }
          );
        }
      }
    );
  }


  async addPlaces(places, myLatLng, map, type) {

    const placesList = document.getElementById("hospital")
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    directionsRenderer.setMap(map);
    var locations = [];
    var posiciones = [];
    var Hospitales = [];
    for (const place of places) {
      if (place.geometry && place.geometry.location) {

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
    posiciones.sort(function (a, b) { return a - b; })
    for (const posicion of posiciones) {
      for (let i = 0; i < locations.length; i++) {
        if (posicion === locations[i].value) {
          let json = {
            datos: locations[i],
            distancia: posicion / 1000
          }
          Hospitales.push(json);
          locations.splice(i, 1)
        }
      }
    }
    for (const Hospital of JSON.parse(JSON.stringify(Hospitales))) {
      const image = {
        url: Hospital.datos.icon!,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      let marker = new google.maps.Marker({
        map,
        icon: image,
        title: Hospital.datos.name!,
        position: Hospital.datos.location,
      });
      let infoWindow = new google.maps.InfoWindow();
      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });

      const li = document.createElement("li")
      if (type == "hos") {
        li.innerHTML = `<ul><li STYLE="list-style:none" >Hospital: ${Hospital.datos.name!}</li><li STYLE="list-style:none" >Direccion ${Hospital.datos.addres!}</li><li STYLE="list-style:none" >Distancia ${Hospital.distancia!} Km</li></ul>`;
      }
      else {
        li.innerHTML = `<ul><li STYLE="list-style:none" >Municipio: ${Hospital.datos.name!}</li><li STYLE="list-style:none" >Distancia ${Hospital.distancia!} Km</li></ul>`;
      }

      placesList.appendChild(li);
      li.addEventListener("click", () => {
        map.setCenter(Hospital.datos.location!);
        this.calculateAndDisplayRoute(directionsService, directionsRenderer, myLatLng, Hospital.datos.location!);
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
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

  showHospitales() {

    this.itemsHospital = document.getElementById("hospital");
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
        this.sismo = data["respuesta"][0]
        this.sismo["descripcion"] = this.sismo["descripcion"].split("of")[1].toUpperCase();
        let fecha = this.sismo["fecha"].split("T")
        this.sismo["fecha"] = fecha[0];
        this.loadMap(this.sismo["latitud"], this.sismo["longitud"], this.sismo["descripcion"])
      }, error => {
        console.log("error")
        console.log(error);
      });
  }

  clickComoActuar() {
    this.navCtrl.navigateForward("/como-actauar");
  }
  clickTodosSismos() {
    this.navCtrl.navigateForward("/todos-sismos");
  }

  //se encarga de mostrar el menu, en este caso estara desabilitado
  cargarmenu() {
    this.appControle.setMenu(false);
  }
}





