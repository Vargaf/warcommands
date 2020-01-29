import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from './tile/tile.component';
import { BasicModeComponentDirective } from '../basic-mode.directive';
import { MinionComponent } from './minion/minion.component';
import { StatsService } from 'src/warcommands/basic-mode/infrastructure/stats.service';
import { MapGeneratorService } from 'src/warcommands/gameEngine/domain/maps/services/map-generator.service';
import { BasicModeGameEngineService } from 'src/warcommands/basic-mode/game-engine-basic-mode.service';



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
  ],
  providers: [
    MapGeneratorService,
    BasicModeGameEngineService,
    StatsService
  ]
})
export class GraphicsModule { }
