import { NgModule } from '@angular/core';
import { MapToResponseTranslatorService } from 'src/warcommands/gameEngine/domain/maps/services/map-to-response-translator.service';
import * as GameServiceProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-service.provider';
import * as MapMemoryRepository from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map-memory-repository.provider';
import * as MapPathfindingRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map-pathfinding-grid-repository.provider';
import * as MapEngineProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map-engine.provider';
import * as BuildPlacementProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/build-place-manager.provider';
import * as NonBuildingTileRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/non-building-tile-repository.provider';
import * as GameEventBusProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-event-bus.provider';
import { GameMiddlewareService } from 'src/warcommands/game-middleware/game-middleware.service';
import { GameEngineListenersService } from 'src/warcommands/game-middleware/game-engine-listeners.service';
import { GameServiceListenersService } from 'src/warcommands/game-middleware/game-service-listeners.service';
import * as PlayerCommandsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/player-commands-manager.provider';
import * as CommandRepositoryInMemoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/command/command-repository-in-memory.provider';
import * as InMemoryCommandContainerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/command-container/in-memory-command-container-repository.provider';
import * as FileParserProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/file/file-parser.provider';
import * as GameLoopManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-loop/game-loop-managerprovider';
import * as GameClassFactoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/game-class/game-class-factory.provider';
import * as GameClassProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/game-class/game-class.provider';
import * as ClassFactoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/class-factory.provider';
import * as PlayerManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player/player-manager.provider';
import * as FileMirrorDuplicationProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/file-mirror-duplication.provider';
import * as InMemoryPlayerRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player/in-memory-player-repository.provider';


@NgModule({
    providers: [
        { provide: MapToResponseTranslatorService, useClass: MapToResponseTranslatorService },
        GameServiceProvider.provider,
        MapMemoryRepository.provider,
        MapPathfindingRepositoryProvider.provider,
        MapEngineProvider.provider,
        BuildPlacementProvider.provider,
        NonBuildingTileRepositoryProvider.provider,
        GameEventBusProvider.provider,
        GameMiddlewareService,
        GameEngineListenersService,
        GameServiceListenersService,
        PlayerCommandsManagerProvider.provider,
        CommandRepositoryInMemoryProvider.provider,
        InMemoryCommandContainerProvider.provider,
        FileParserProvider.provider,
        GameLoopManagerProvider.provider,
        GameClassFactoryProvider.provider,
        GameClassProvider.provider,
        ClassFactoryProvider.provider,
        PlayerManagerProvider.provider,
        FileMirrorDuplicationProvider.provider,
        InMemoryPlayerRepositoryProvider.provider,
    ]
})
export class BasicModeOnMemoryModule { }
