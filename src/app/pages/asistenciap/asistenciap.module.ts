import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciapPageRoutingModule } from './asistenciap-routing.module';

import { AsistenciapPage } from './asistenciap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciapPageRoutingModule
  ],
  declarations: [AsistenciapPage]
})
export class AsistenciapPageModule {}
