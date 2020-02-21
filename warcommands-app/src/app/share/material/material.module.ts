import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  exports: [
    MatSidenavModule,
    MatIconModule,
    DragDropModule
  ]
})
export class MaterialModule { }
