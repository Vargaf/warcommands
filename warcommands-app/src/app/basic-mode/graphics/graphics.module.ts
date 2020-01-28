import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from './tile/tile.component';
import { BasicModeComponentDirective } from '../basic-mode.directive';
import { MinionComponent } from './minion/minion.component';



@NgModule({
  declarations: [
    BasicModeComponentDirective,
    TileComponent,
    MinionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BasicModeComponentDirective
  ],
  entryComponents: [
    TileComponent,
    MinionComponent
  ]
})
export class GraphicsModule { }
