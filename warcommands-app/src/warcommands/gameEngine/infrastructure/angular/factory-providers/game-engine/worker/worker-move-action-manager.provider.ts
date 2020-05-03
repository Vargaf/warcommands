import { WorkerMoveActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-move-action-manager.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/build/in-memory-buildings-repository.service';
import { PathFindingManagerService } from 'src/warcommands/gameEngine/domain/maps/services/path-finding-manager.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-units-repository-service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { MapBlockedTilesManagerService } from 'src/warcommands/gameEngine/domain/maps/services/map-blocked-tiles-manager.service';

const factory = (
    buildingsRepositoryService: BuildingsRepositoryService,
    pathFindingManager: PathFindingManagerService,
    unitsRepositoryService: UnitsRepositoryService,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    gameEventBusService: GameEventBusService,
    mapBlockedTilesManagerService: MapBlockedTilesManagerService
) => {
    return new WorkerMoveActionManagerService(
        buildingsRepositoryService,
        pathFindingManager,
        unitsRepositoryService,
        gameLogicTimeFrameService,
        gameEventBusService,
        mapBlockedTilesManagerService
    );
};

export const provider = {
    provide: WorkerMoveActionManagerService,
    useFactory: factory,
    deps: [
        InMemoryBuildingsRepositoryService,
        PathFindingManagerService,
        InMemoryUnitsRepositoryService,
        GameLogicTimeFrameService,
        GameEventBusService,
        MapBlockedTilesManagerService
    ]
};