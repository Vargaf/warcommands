import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  exports: [
    MatSidenavModule,
    MatIconModule
  ]
})
export class MaterialModule { }
