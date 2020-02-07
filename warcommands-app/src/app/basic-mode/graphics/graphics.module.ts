import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicModeComponentDirective } from '../basic-mode.directive';
import { MinionComponent } from './minion/minion.component';
import { StatsService } from 'src/warcommands/basic-mode/infrastructure/stats.service';
import { MapGeneratorService } from 'src/warcommands/gameEngine/domain/maps/services/map-generator.service';
import { BasicModeGameEngineService } from 'src/warcommands/basic-mode/game-engine-basic-mode.service';
import { RequestAnimationFrameService } from 'src/warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service';
import { RequestAnimationFrameNgrxService } from 'src/warcommands/basic-mode/infrastructure/ngrx/request-animation-frame/request-animation-frame-ngrx.service';
import { TileGrassComponent } from './tile-grass/tile-grass.component';
import { TileSandComponent } from './tile-sand/tile-sand.component';
import { TileWaterComponent } from './tile-water/tile-water.component';
import { BaseComponent } from './base/base.component';



@NgModule({
  declarations: [
    BasicModeComponentDirective,
    MinionComponent,
    TileGrassComponent,
    TileSandComponent,
    TileWaterComponent,
    BaseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BasicModeComponentDirective
  ],
  entryComponents: [
    MinionComponent,
    TileGrassComponent,
    TileSandComponent,
    TileWaterComponent,
    BaseComponent
  ],
  providers: [
    MapGeneratorService,
    BasicModeGameEngineService,
    StatsService,
    { provide: RequestAnimationFrameService, useClass: RequestAnimationFrameNgrxService }
  ]
})
export class GraphicsModule { }
