import { Component, OnInit } from '@angular/core';
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
                this.callPaginaPrincipal(notification);
                this.presentAlert(notification)
            }
        );
        //segundo plano
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                this.callPaginaPrincipal(notification);
                this.playAudio(true);
                this.presentAlert(notification)
            }
        );
    }

    callPaginaPrincipal(notificacion) {
        this.navCtrl.navigateForward(`/pages-maps-earthquake`)
    }

    playAudio(estado) {
        if (estado) {
            this.nativeAudio.preloadSimple('alarm', 'assets/alert.mp3').then(() => {
                this.nativeAudio.play('alarm');
            });
        }
        else {
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

}





