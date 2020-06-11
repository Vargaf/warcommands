import { EnqueueUnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/enqueue-units-manager.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { BuildingSpawnerServiceFactory } from 'src/warcommands/gameEngine/domain/game-engine/sevices/building-spawner-service.factory';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { SpawingBuildingsRepositoryservice } from 'src/warcommands/gameEngine/domain/building/services/spawning-buildings-repository.service';
import { InMemorySpawningBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-spawning-buildings-repository.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';

const factory = (
    buildingSpawnerServiceFactory: BuildingSpawnerServiceFactory,
    buildingsRepositoryService: BuildingsRepositoryService,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    gameEventBusService: GameEventBusService,
    spawningBuildngsRepositoryService: SpawingBuildingsRepositoryservice,
    unitsRepositoryService: UnitsRepositoryService
) => {
    return new EnqueueUnitsManagerService(
        buildingSpawnerServiceFactory,
        buildingsRepositoryService,
        gameLogicTimeFrameService,
        gameEventBusService,
        spawningBuildngsRepositoryService,
        unitsRepositoryService
    );
};

export const provider = {
    provide: EnqueueUnitsManagerService,
    useFactory: factory,
    deps: [
        BuildingSpawnerServiceFactory,
        InMemoryBuildingsRepositoryService,
        GameLogicTimeFrameService,
        GameEventBusService,
        InMemorySpawningBuildingsRepositoryService,
        InMemoryUnitsRepositoryService
    ]
};