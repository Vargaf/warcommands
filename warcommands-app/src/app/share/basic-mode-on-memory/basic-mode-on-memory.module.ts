import { NgModule } from '@angular/core';
import { MapToResponseTranslatorService } from 'src/warcommands/gameEngine/domain/maps/services/map-to-response-translator.service';
import * as GameServiceProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-service.provider';
import * as MapMemoryRepository from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map-memory-repository.provider';
import * as MapPathfindingRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map-pathfinding-grid-repository.provider';
import * as MapEngineProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map-engine.provider';
import * as BuildPlacementProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/build-place-manager.provider';
import * as NonBuildingTileRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/non-building-tile-repository.provider';


@NgModule({
  providers: [
    { provide: MapToResponseTranslatorService, useClass: MapToResponseTranslatorService },
    GameServiceProvider.provider,
    MapMemoryRepository.provider,
    MapPathfindingRepositoryProvider.provider,
    MapEngineProvider.provider,
    BuildPlacementProvider.provider,
    NonBuildingTileRepositoryProvider.provider
  ]
})
export class BasicModeOnMemoryModule { }
