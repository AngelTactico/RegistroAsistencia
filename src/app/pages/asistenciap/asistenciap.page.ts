import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AnimationController } from '@ionic/angular';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-asistenciap',
  templateUrl: './asistenciap.page.html',
  styleUrls: ['./asistenciap.page.scss'],
})
export class AsistenciapPage implements OnInit, AfterViewInit {


    @ViewChild('titulo', {read: ElementRef, static:true}) titulo: ElementRef;
  
  
    public usuario: Usuario;
    
     constructor(
          private activeroute: ActivatedRoute
        , private router: Router
        , private alertController: AlertController
        , private animationController: AnimationController
        , private supabaseService: SupabaseService) {
  
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
  
  }
  