import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AnimationController } from '@ionic/angular';
import { SupabaseService } from 'src/app/supabase.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', {read: ElementRef, static:true}) titulo: ElementRef;


  public usuario: Usuario;
  
   constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController
      , private animationController: AnimationController
      , private supabaseService: SupabaseService
      , private toastController: ToastController) {

}

public ngAfterViewInit(): void {
  const animation = this.animationController
  .create()
  .addElement(this.titulo.nativeElement)
  .iterations(Infinity)
  .duration(5000)
  .fromTo('transform','translate(0%)','translate( 100%)')
  .fromTo('opacity', 0.5, 1);
  animation.play();
}


async Presente() {
  if (this.usuario) {
    const actualizado = await this.supabaseService.actualizarPresenteUsuario(this.usuario.Presente, true);
    if (actualizado) {
      console.log('Se actualizó el estado de asistencia del usuario');
      this.mostrarMensaje('Estas presente!');

      // Quizás mostrar un mensaje o actualizar la UI
    } else {
      console.error('Error al actualizar el estado de asistencia del usuario');
      // Manejar el error
    }
  }
}

public ngOnInit() {
}

goToLogout(){
this.router.navigate(['/'])
}

goToAsistencia(){
  this.router.navigate(['/asistencia'])
  }
 
  goToHome(){
    this.router.navigate(['/home'])
    }  

    async mostrarMensaje(mensaje: string, duracion?: number) {
      const toast = await this.toastController.create({
          message: mensaje,
          duration: duracion? duracion: 2000
        });
      toast.present();
    }


    segmentChanged(event: any) {
      // Agrega la lógica que deseas ejecutar cuando cambie el segmento
      console.log('Segment changed', event);
    }    
    
}


