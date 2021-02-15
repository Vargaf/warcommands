import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularHomeRoutingModule } from './angular-home-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AngularHomeRoutingModule
  ]
})
export class AngularHomeModule { }
