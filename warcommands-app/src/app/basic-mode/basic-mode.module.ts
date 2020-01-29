import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicModeComponent } from './basic-mode.component';
import { BasicModeRoutingModule } from './basic-mode-routing.module';
import { GameService } from 'src/warcommands/gameEngine/domain/game.service';
import { GraphicsModule } from './graphics/graphics.module';
import { BasicModeGameEngineService } from 'src/warcommands/basic-mode/game-engine-basic-mode.service';
import { MapGeneratorService } from 'src/warcommands/gameEngine/domain/maps/services/map-generator.service';
import { StatsComponent } from './stats/stats.component';
import { StatsService } from 'src/warcommands/basic-mode/infrastructure/stats.service';



@NgModule({
  declarations: [
    BasicModeComponent,
    StatsComponent
  ],
  imports: [
    CommonModule,
    BasicModeRoutingModule,
    GraphicsModule
  ],
  providers: [
    { provide: GameService, useClass: GameService },
  ]
})
export class BasicModeModule { }
