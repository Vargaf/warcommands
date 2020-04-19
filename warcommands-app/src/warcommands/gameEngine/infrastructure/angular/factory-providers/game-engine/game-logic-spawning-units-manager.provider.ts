import { GameLogicSpawningUnitsManager } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-spawning-units-manager.service';
import { SpawingBuildingsRepositoryservice } from 'src/warcommands/gameEngine/domain/building/services/spawning-buildings-repository.service';
import { InMemorySpawningBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-spawning-buildings-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/game-engine/units/services/units-repository.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { MapBlockedTilesManagerService } from 'src/warcommands/gameEngine/domain/maps/services/map-blocked-tiles-manager.service';

const factory = (
    spawningBuildngsRepositoryService: SpawingBuildingsRepositoryservice,
    unitsRepositoryService: UnitsRepositoryService,
    gameEventsBusSevice: GameEventBusService,
    buildingsRepositoryService: BuildingsRepositoryService,
    mapBlockedTilesManagerService: MapBlockedTilesManagerService
) => {
    return new GameLogicSpawningUnitsManager(
        spawningBuildngsRepositoryService,
        unitsRepositoryService,
        gameEventsBusSevice,
        buildingsRepositoryService,
        mapBlockedTilesManagerService
    )
};

export const provider = {
    provide: GameLogicSpawningUnitsManager,
    useFactory: factory,
    deps: [
        InMemorySpawningBuildingsRepositoryService,
        InMemoryUnitsRepositoryService,
        GameEventBusService,
        InMemoryBuildingsRepositoryService,
        MapBlockedTilesManagerService
    ]
};