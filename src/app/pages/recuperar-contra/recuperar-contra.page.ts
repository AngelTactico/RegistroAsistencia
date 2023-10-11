import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage implements OnInit {

  public usuario: Usuario;
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '', '');
    this.usuario.correo = '';
  }

  public ngOnInit(): void {
  }

  public ingresarRecu(): void {

    if(!this.validarUsuarioRecu(this.usuario)) {
      return;
    }

    this.mostrarMensaje('¡Bienvenido!');
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/pregunta'], navigationExtras);
  }


  public validarUsuarioRecu(usuario: Usuario): boolean {

    const usu = this.usuario.buscarUsuarioValidoRecu(
      this.usuario.correo);

    if (usu) {
      this.usuario = usu;
      return true;
    }
    else {
      this.mostrarMensaje('Las credenciales no son correctas!');
      return false;
    }
  }
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
  goToLogin(){
    this.router.navigate(['/login'])
  }

}