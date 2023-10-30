import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public usuario: Usuario;

  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario( '', '', '', '', '', '','');
  }

  public ngOnInit(): void {
    this.usuario.Correo = '';
    this.usuario.Contrasenna = '';
    this.ingresar();
  }

  public async ingresar(): Promise<void> {
    if (!(await this.validarUsuario(this.usuario))) {
      return;
    }
  
    // Validar roles con datos de Supabase
    if (this.usuario.Cargo === 'Alumno') {
      // Redirigir a la página de inicio de Alumnos
      this.mostrarMensaje('¡Bienvenido como Alumno!');
      this.irAHome();
    } else if (this.usuario.Cargo === 'Profesor') {
      // Redirigir a la página de inicio de Profesores
      this.mostrarMensaje('¡Bienvenido como Profesor!');
      this.irAHomeProfesor();
    } else {
      this.mostrarMensaje('ERROR: Sin parámetros de identidad. Consulte ayuda.');
      this.irALogin();
    }
  }

  public async validarUsuario(usuario: Usuario): Promise<boolean> {
    const usu = await this.usuario.buscarUsuarioValido(usuario.Correo, usuario.Contrasenna);
  
    if (usu) {
      this.usuario = usu;
      return true;
    } else {
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
  
  goToRecuperarContra(){
    this.router.navigate(['/recuperar-contra'])
  }



  private irAHome() {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/home'], navigationExtras);
  }
  
  private irAHomeProfesor() {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/homep'], navigationExtras);
  }
  
  private irALogin() {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/login'], navigationExtras);
  }

}

