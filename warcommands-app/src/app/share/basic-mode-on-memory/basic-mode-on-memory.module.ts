import { NgModule } from '@angular/core';
import * as GameServiceProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-service.provider';
import * as MapMemoryRepository from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map-memory-repository.provider';
import * as InMemoryMapPathfindingRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map/in-memory-map-pathfinding-grid-repository.provider';
import * as MapEngineProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map/map-engine.provider';
import * as BuildingsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/buildings/buildings-manager.provider';
import * as InMemoryBuildingBlockedTileRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map/in-memory-building-blocked-tile-repository.provider';
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
import * as PathFindingManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map/path-finding-manager.provider';
import * as BuildingCreatedEventFactoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/buildings/building-created-event-factory.provider';
import * as InMemoryBuildingsRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/buildings/in-memory-buildings-repository.provider';
import * as BaseClassProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/base-class/base-class.provider';
import * as BaseClassFactoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/base-class/base-class-factory.provider';
import * as GameLogicProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-logic.provider';
import * as GameLogicEventsListenerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-logic-events-listener.provider';
import * as GameEngineEventListenerHubProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-engine-event-listener-hub.provider';
import * as UnitsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/units/units-manager.provider';
import * as InMemoryUnitsRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/units/in-memory-units-repository.provider';
import * as BaseUnitsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/units/base-units-manager.provider';
import * as BuildingsManagereventListenersProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/buildings/buildings-manager-event-listeners.provider';
import * as InMemorySpawningBuildingsRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/buildings/in-memory-spawning-buildings-repository.provider';
import * as GameLogicSpawningUnitsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-logic-spawning-units-manager.provider';
import * as InMemoryUnitBlockedTileRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map/in-memory-unit-blocked-tile.repository.service';
import * as MapBlockedTilesProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map/map-blocked-tiles-manager.provider';

@NgModule({
    providers: [
        GameServiceProvider.provider,
        MapMemoryRepository.provider,
        InMemoryMapPathfindingRepositoryProvider.provider,
        MapEngineProvider.provider,
        BuildingsManagerProvider.provider,
        InMemoryBuildingBlockedTileRepositoryProvider.provider,
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
        PathFindingManagerProvider.provider,
        BuildingCreatedEventFactoryProvider.provider,
        InMemoryBuildingsRepositoryProvider.provider,
        BaseClassProvider.provider,
        BaseClassFactoryProvider.provider,
        GameLogicProvider.provider,
        GameLogicEventsListenerProvider.provider,
        GameEngineEventListenerHubProvider.provider,
        UnitsManagerProvider.provider,
        InMemoryUnitsRepositoryProvider.provider,
        BaseUnitsManagerProvider.provider,
        BuildingsManagereventListenersProvider.provider,
        InMemorySpawningBuildingsRepositoryProvider.provider,
        GameLogicSpawningUnitsManagerProvider.provider,
        InMemoryUnitBlockedTileRepositoryProvider.provider,
        MapBlockedTilesProvider.provider
    ]
})
export class BasicModeOnMemoryModule { }
