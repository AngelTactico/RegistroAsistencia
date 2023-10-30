import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from 'src/app/supabase.service';
import { IonicModule } from '@ionic/angular';

import { AsistenciaPageRoutingModule } from './asistencia-routing.module';

import { AsistenciaPage } from './asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaPageRoutingModule
  ],
  declarations: [AsistenciaPage],
  providers: [SupabaseService],
})
export class AsistenciaPageModule {}
