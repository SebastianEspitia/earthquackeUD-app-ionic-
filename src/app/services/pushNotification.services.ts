import { Component, OnInit } from '@angular/core';
//import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed, LocalNotificationActionPerformed } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { Platform, AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import {
    ActionPerformed,
    PushNotificationSchema,
    PushNotifications,
    Token,
} from '@capacitor/push-notifications';
// const { PushNotifications } = Plugins;
//const { LocalNotifications } = Plugins;
//import { FirebaseauthService } from './firebaseauth.service';
//import { FirestoreService } from './firestore.service';
// import { NavigationExtras } from '@angular/router';
// import { dashCaseToCamelCase } from '@angular/compiler/src/util';



@Injectable({
    providedIn: 'root'
})
export class pushNotification {
    constructor(private alertController: AlertController, private nativeAudio: NativeAudio, public platform: Platform, private router: Router, private http: HttpClient, private navCtrl: NavController) {
        this.addListeners();
        this.crearCanal();
    }
    public register() {
        PushNotifications.register();
    }


    crearCanal() {
        PushNotifications.createChannel({
            id: 'fcm_default_channel',
            name: 'My notification channel',
            description: 'General Notifications',
            sound: 'alert.mp3',
            importance: 3,
            visibility: 1,
            lights: true,
            vibration: true
        }).then(ok => {
            console.log("then channel")
            console.log(ok)            
        }).catch(error => {
            console.log("eror channel")
            console.log(error)
        });
    }

    addListeners() {
        /// primer plano
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                console.log("entr en la notificacion interna")
                this.callPaginaPrincipal(notification);
                this.playAudio(true);
                this.presentAlert(notification)
                // this.localNotificationPP(notification);
            }
        );
        //segundo plano
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                this.callPaginaPrincipal(notification);
                this.playAudio(true);
                this.presentAlert(notification)
                //this.localNotificationPP(notification);
            }
        );
        // /// primer plano
        // PushNotifications.addListener('pushNotificationReceived',
        //     (notification: PushNotification) => {
        //         console.log("entr en la notificacion interna")
        //         this.callPaginaPrincipal(notification);
        //         this.localNotificationPP(notification);
        //     }
        // );
        // //segundo plano
        // PushNotifications.addListener('pushNotificationActionPerformed',
        //     (notification: PushNotificationActionPerformed) => {
        //         this.callPaginaPrincipal(notification);
        //         this.localNotificationPP(notification);
        //     }
        // );
    }

    callPaginaPrincipal(notificacion) {
        // let navigationExtras: NavigationExtras = {
        //     state: {
        //         status: 'true'
        //     }
        // };

        this.navCtrl.navigateForward(`/pages-maps-earthquake`)
    }

    playAudio(estado) {

        if (estado) {
            console.log("sonido alarma true")
            this.nativeAudio.preloadSimple('alarm', 'assets/alert.mp3').then(() => {
                this.nativeAudio.play('alarm');
            });
        }
        else {
            console.log("sonido alarma false")
            this.nativeAudio.stop('alarm');
        }
    }

    async presentAlert(mensaje) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: mensaje.data.descricion.toUpperCase(),
            message: mensaje.data.body,
            buttons: [{
                text: 'OK',
                handler: () => {
                    console.log("click en alerta")
                    this.playAudio(false)
                }
            }]
        });
        await alert.present();
    }

    //notificaciones locales primer plano
    // localNotificationPP(notificacion) {
    //     LocalNotifications.schedule({
    //         notifications: [
    //             {
    //                 id: 1,
    //                 title: `${notificacion.title}`,
    //                 body: `${notificacion.body}`,
    //                 sound: `res://www/assets/alert.mp3`,
    //                 smallIcon: "res://www/assets/icon/favicon.png"
    //             }
    //         ]
    //     });
    // }
}





