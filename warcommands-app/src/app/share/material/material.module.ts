import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  exports: [
    MatSidenavModule,
    MatIconModule,
    DragDropModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
