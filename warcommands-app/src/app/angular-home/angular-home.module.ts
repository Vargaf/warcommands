import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularHomeRoutingModule } from './angular-home-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../share/material/material.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AngularHomeRoutingModule,
    MaterialModule,
  ]
})
export class AngularHomeModule { }
