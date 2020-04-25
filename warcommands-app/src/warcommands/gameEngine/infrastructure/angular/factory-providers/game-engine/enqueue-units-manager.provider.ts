import { EnqueueUnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/enqueue-units-manager.service';
import { UnitsToCreateRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-to-create-repository.service';
import { InMemoryUnitsToCreateRepositoryService } from '../../../memory-repository/unit/in-memory-units-to-create-repository.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { BuildingSpawnerServiceFactory } from 'src/warcommands/gameEngine/domain/game-engine/sevices/building-spawner-service.factory';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { SpawingBuildingsRepositoryservice } from 'src/warcommands/gameEngine/domain/building/services/spawning-buildings-repository.service';
import { InMemorySpawningBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-spawning-buildings-repository.service';

const factory = (
    unitsToCreateRepositoryService: UnitsToCreateRepositoryService,
    buildingSpawnerServiceFactory: BuildingSpawnerServiceFactory,
    buildingsRepositoryService: BuildingsRepositoryService,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    gameEventBusService: GameEventBusService,
    spawningBuildngsRepositoryService: SpawingBuildingsRepositoryservice,
) => {
    return new EnqueueUnitsManagerService(
        unitsToCreateRepositoryService,
        buildingSpawnerServiceFactory,
        buildingsRepositoryService,
        gameLogicTimeFrameService,
        gameEventBusService,
        spawningBuildngsRepositoryService
    );
};

export const provider = {
    provide: EnqueueUnitsManagerService,
    useFactory: factory,
    deps: [
        InMemoryUnitsToCreateRepositoryService,
        BuildingSpawnerServiceFactory,
        InMemoryBuildingsRepositoryService,
        GameLogicTimeFrameService,
        GameEventBusService,
        InMemorySpawningBuildingsRepositoryService
    ]
};