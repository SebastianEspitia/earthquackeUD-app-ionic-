import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from "../../app.component";
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-todos-sismos',
  templateUrl: './todos-sismos.component.html',
  styleUrls: ['./todos-sismos.component.scss'],
})
export class TodosSismosComponent implements OnInit {
  listasismos;
  constructor(private navCtrl: NavController,private http: HttpClient, private appControle: AppComponent, private menu: MenuController) { }

  ngOnInit() {
    this.todossismos();
    this.cargarmenu();
    this.menu.close();
  }

  todossismos() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      })
    };

    this.http.get("http://192.168.20.23:8888/consultaSismosolombia")
      .subscribe(data => {
        this.listasismos = data["respuesta"];
        for (var i = 0;i< this.listasismos.length; i++){
          this.listasismos[i]["descripcion"]=this.listasismos[i]["descripcion"].split("of")[1];
          let fecha=this.listasismos[i]["fecha"].split("T")
          let day =fecha[0];
          let hour=fecha[1].split(":")
          this.listasismos[i]["fecha"]=day+" / "+hour[0]+":"+hour[1];
        }
      }, error => {
        console.log("error")
        console.log(error);
      });
  }
  //se encarga de mostrar el menu, en este caso estara desabilitado
  cargarmenu() {
    this.appControle.setMenu(false);
  }

  backpage(){
    this.navCtrl.back();
  }
}
