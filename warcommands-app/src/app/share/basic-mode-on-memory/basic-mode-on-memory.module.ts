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
import * as InMemoryBuildingsRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/buildings/in-memory-buildings-repository.provider';
import * as BaseClassProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/base-class/base-class.provider';
import * as BaseClassFactoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/base-class/base-class-factory.provider';
import * as GameLogicProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-logic.provider';
import * as GameLogicEventsListenerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-logic-events-listener.provider';
import * as GameEngineEventListenerHubProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-engine-event-listener-hub.provider';
import * as InMemoryUnitsRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/units/in-memory-units-repository.provider';
import * as BuildingsManagereventListenersProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/buildings/buildings-manager-event-listeners.provider';
import * as InMemorySpawningBuildingsRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/buildings/in-memory-spawning-buildings-repository.provider';
import * as GameLogicSpawningUnitsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-logic-spawning-units-manager.provider';
import * as InMemoryUnitBlockedTileRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map/in-memory-unit-blocked-tile.repository.service';
import * as MapBlockedTilesProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/map/map-blocked-tiles-manager.provider';
import * as InMemoryUnitsToCreateRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/units/in-memory-units-to-create-repository.provider';
import * as EnqueueUnitsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/enqueue-units-manager.provider';
import * as BuildingSpawnerServiceFactoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/building-spawner-service-factory.provider';
import * as BaseBuildingSpawnerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/buildings/base-building-spawner.provider';
import * as GameLogicTimeFrameProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-logic-time-frame.provider';
import * as SpawnUnitsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/spawn-units-manager.provider';
import * as InitialBuildingsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/buildings/initial-buildings-manager.provider';
import * as WorkerClassProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/worker-class/worker-class.provider';
import * as WorkerClassFactoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/worker-class/worker-class-factory.provider';
import * as GameLogicWorkerActionsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/worker/game-logic-worker-actions-manager.provider';
import * as InMemoryUnitSuperActionRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/units/in-memory-unit-super-action-repository.provider';
import * as GameLogicInitializeWorkerHarvestActionsServiceProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/worker/game-logic-initialize-worker-harvest-actions-service.provider';
import * as GameLogicActionsManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/game-logic-actions-manager.provider';
import * as GameLogicMoveToActionManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-logic-actions/game-logic-move-to-action-manager.provider';
import * as GameLogicActionManagerFactoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-logic-actions/game-logic-action-manager-factory.provider';
import * as GameLogicHarvestActionManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-logic-actions/game-logic-harvest-action-manager.provider';
import * as GameLogicDeliverActionManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-logic-actions/game-logic-deliver-action-manager.provider';
import * as WarcommandsNgZoneProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-engine/warcommands-ng-zone.provider';
import * as PlayerCommandsScopeManagerProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-loop/player-commands-scope-manager.provider';
import * as InMemoryPlayerCommandsScopeRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-loop/in-memory-player-commands-scope-repository.provider';
import * as InMemoryPlayerCommandScopeVarValueRepositoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/game-loop/in-memory-player-command-scope-var-value-repository.provider';
import * as ArrayClassFactoryProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/array-class/array-class-factory.provider';
import * as ArrayClassProvider from 'src/warcommands/gameEngine/infrastructure/angular/factory-providers/player-commands/array-class/array-class.provider';









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
        InMemoryBuildingsRepositoryProvider.provider,
        BaseClassProvider.provider,
        BaseClassFactoryProvider.provider,
        GameLogicProvider.provider,
        GameLogicEventsListenerProvider.provider,
        GameEngineEventListenerHubProvider.provider,
        InMemoryUnitsRepositoryProvider.provider,
        BuildingsManagereventListenersProvider.provider,
        InMemorySpawningBuildingsRepositoryProvider.provider,
        GameLogicSpawningUnitsManagerProvider.provider,
        InMemoryUnitBlockedTileRepositoryProvider.provider,
        MapBlockedTilesProvider.provider,
        InMemoryUnitsToCreateRepositoryProvider.provider,
        EnqueueUnitsManagerProvider.provider,
        BuildingSpawnerServiceFactoryProvider.provider,
        BaseBuildingSpawnerProvider.provider,
        GameLogicTimeFrameProvider.provider,
        SpawnUnitsManagerProvider.provider,
        InitialBuildingsManagerProvider.provider,
        WorkerClassProvider.provider,
        WorkerClassFactoryProvider.provider,
        GameLogicWorkerActionsManagerProvider.provider,
        InMemoryUnitSuperActionRepositoryProvider.provider,
        GameLogicInitializeWorkerHarvestActionsServiceProvider.provider,
        GameLogicActionsManagerProvider.provider,
        GameLogicMoveToActionManagerProvider.provider,
        GameLogicActionManagerFactoryProvider.provider,
        GameLogicHarvestActionManagerProvider.provider,
        GameLogicDeliverActionManagerProvider.provider,
        WarcommandsNgZoneProvider.provider,
        PlayerCommandsScopeManagerProvider.provider,
        InMemoryPlayerCommandsScopeRepositoryProvider.provider,
        InMemoryPlayerCommandScopeVarValueRepositoryProvider.provider,
        ArrayClassFactoryProvider.provider,
        ArrayClassProvider.provider
    ]
})
export class BasicModeOnMemoryModule { }
