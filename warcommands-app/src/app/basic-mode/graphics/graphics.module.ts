import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicModeComponentDirective } from '../basic-mode.directive';
import { WorkerComponent } from './worker/worker.component';
import { StatsService } from 'src/warcommands/basic-mode/infrastructure/stats.service';
import { BasicModeGameEngineService } from 'src/warcommands/basic-mode/game-engine-basic-mode.service';
import { RequestAnimationFrameService } from 'src/warcommands/basic-mode/domain/request-animation-frame/request-animation-frame.service';
import { RequestAnimationFrameNgrxService } from 'src/warcommands/basic-mode/infrastructure/ngrx/request-animation-frame/request-animation-frame-ngrx.service';
import { TileGrassComponent } from './tile-grass/tile-grass.component';
import { TileSandComponent } from './tile-sand/tile-sand.component';
import { TileWaterComponent } from './tile-water/tile-water.component';
import { BaseComponent } from './base/base.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { MatterFarmComponent } from './matter-farm/matter-farm.component';
import { EnergyFarmComponent } from './energy-farm/energy-farm.component';
import { PlayerResourcesComponent } from './player-resources/player-resources.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    BasicModeComponentDirective,
    WorkerComponent,
    TileGrassComponent,
    TileSandComponent,
    TileWaterComponent,
    BaseComponent,
    MatterFarmComponent,
    EnergyFarmComponent,
    PlayerResourcesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    BasicModeComponentDirective
  ],
  entryComponents: [
    WorkerComponent,
    TileGrassComponent,
    TileSandComponent,
    TileWaterComponent,
    BaseComponent,
    MatterFarmComponent,
    EnergyFarmComponent
  ],
  providers: [
    BasicModeGameEngineService,
    StatsService,
    { provide: RequestAnimationFrameService, useClass: RequestAnimationFrameNgrxService }
  ]
})
export class GraphicsModule { }
