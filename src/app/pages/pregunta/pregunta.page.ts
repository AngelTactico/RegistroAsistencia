import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  public usuario: Usuario;
  public respuesta: string = "";

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  public ngOnInit() {
  }

  public async mostrarDatosPersona(): Promise<void> {
    const usu = await this.usuario.buscarUsuarioValidoRecu(this.usuario.Correo);

    if (usu && usu.Respuesta.trim() === this.respuesta) {
      this.presentAlert('CORRECTO', 'TU CONTRASEÑA ES ' + usu.Contrasenna);
      return;
    }

    let mensaje = '¡LO SENTIMOS PERO LOS DATOS INGRESADOS NO SON CORRECTOS!';

    this.presentAlert('INCORRECTO', mensaje);
  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
