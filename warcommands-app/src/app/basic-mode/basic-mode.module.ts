import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicModeComponent } from './basic-mode.component';
import { BasicModeRoutingModule } from './basic-mode-routing.module';
import { GraphicsModule } from './graphics/graphics.module';
import { StatsComponent } from './stats/stats.component';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../share/material/material.module';
import * as BasicModeGameEngineStore from '../../ngrx/basic-mode/reducer-map';
import { DomElementInjectorService } from 'src/warcommands/basic-mode/infrastructure/angular/dom-element-injector.service';
import { DomElementComponentFactoryService } from 'src/warcommands/basic-mode/infrastructure/angular/dom-element-component-factory.service';
import { GAME_ENGINE_BASIC_MODE_CONFIGURATION, GAME_CONFIG } from 'src/warcommands/basic-mode/game-engine-basic-mode-configurations';
import { BasicModeOnMemoryModule } from '../share/basic-mode-on-memory/basic-mode-on-memory.module';
import { CommandsPanelModule } from '../commands-panel/commands-panel.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UnitSpawningManagerService } from 'src/warcommands/basic-mode/domain/units/services/unit-spawning-manager.service';
import { BuildingsManagerService } from 'src/warcommands/basic-mode/domain/building/services/buildings-manager.service';



@NgModule({
  declarations: [
    BasicModeComponent,
    StatsComponent
  ],
  imports: [
    CommonModule,
    CommandsPanelModule,
    BasicModeRoutingModule,
    GraphicsModule,
    MaterialModule,
    BasicModeOnMemoryModule,
    FlexLayoutModule,
    StoreModule.forFeature(BasicModeGameEngineStore.GameEngineBasicModeStoreKey, BasicModeGameEngineStore.BASIC_MODE_REDUCER_MAP_TOKEN),
  ],
  providers: [
    DomElementInjectorService,
    DomElementComponentFactoryService,
    UnitSpawningManagerService,
    BuildingsManagerService,
    { provide: GAME_CONFIG, useValue: GAME_ENGINE_BASIC_MODE_CONFIGURATION },
    { provide: BasicModeGameEngineStore.BASIC_MODE_REDUCER_MAP_TOKEN, useFactory: BasicModeGameEngineStore.reducers }
  ]
})
export class BasicModeModule { }
