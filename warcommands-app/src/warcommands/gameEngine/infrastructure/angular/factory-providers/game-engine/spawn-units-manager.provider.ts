import { SpawnUnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/spawn-units-manager.service';
import { SpawingBuildingsRepositoryservice } from 'src/warcommands/gameEngine/domain/building/services/spawning-buildings-repository.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { MapBlockedTilesManagerService } from 'src/warcommands/gameEngine/domain/maps/services/map-blocked-tiles-manager.service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { InMemorySpawningBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-spawning-buildings-repository.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';
import { BuildingSpawnerServiceFactory } from 'src/warcommands/gameEngine/domain/game-engine/sevices/building-spawner-service.factory';

const factory = (
    spawningBuildngsRepositoryService: SpawingBuildingsRepositoryservice,
    buildingsRepositoryService: BuildingsRepositoryService,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    mapBlockedTilesManagerService: MapBlockedTilesManagerService,
    gameEventBusService: GameEventBusService,
    unitsRepositoryService: UnitsRepositoryService,
    buildingSpawnerServiceFactory: BuildingSpawnerServiceFactory,
) => {
    return new SpawnUnitsManagerService(
        spawningBuildngsRepositoryService,
        buildingsRepositoryService,
        gameLogicTimeFrameService,
        mapBlockedTilesManagerService,
        gameEventBusService,
        unitsRepositoryService,
        buildingSpawnerServiceFactory
    );
};

export const provider = {
    provide: SpawnUnitsManagerService,
    useFactory: factory,
    deps: [
        InMemorySpawningBuildingsRepositoryService,
        InMemoryBuildingsRepositoryService,
        GameLogicTimeFrameService,
        MapBlockedTilesManagerService,
        GameEventBusService,
        InMemoryUnitsRepositoryService,
        BuildingSpawnerServiceFactory
    ]
};