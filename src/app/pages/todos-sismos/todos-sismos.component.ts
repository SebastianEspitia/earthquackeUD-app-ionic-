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
        // console.log("exitoso ");
        // console.log(data);
        this.listasismos = data["respuesta"];
        console.log(this.listasismos)
        

        console.log(this.listasismos);
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
