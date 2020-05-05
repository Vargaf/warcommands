import { GameLogicInitializeWorkerActionsService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/game-logic-initialize-worker-actions.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { UnitSuperAcionRepositopriService } from 'src/warcommands/gameEngine/domain/units/unit-actions/unit-super-action-repository.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { WorkerHarvestActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-harvest-action-manager.service';
import { WorkerDeliverActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-deliver-action-manager.service';
import { WorkerMoveActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-move-action-manager.service';
import { InMemoryUnitsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-units-repository-service';
import { InMemoryUnitSuperActionRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-unit-super-action-repository.service';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/build/in-memory-buildings-repository.service';


const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
    buildingsRepositoryService: BuildingsRepositoryService,
    workerHarvestActionManagerService: WorkerHarvestActionManagerService,
    workerDeliverActionManagerService: WorkerDeliverActionManagerService,
    workerMoveActionManager: WorkerMoveActionManagerService,
) => {
    return new GameLogicInitializeWorkerActionsService(
        unitsRepositoryService,
        unitSuperActionRepositoryService,
        buildingsRepositoryService,
        workerHarvestActionManagerService,
        workerDeliverActionManagerService,
        workerMoveActionManager
    );
};

export const provider = {
    provide: GameLogicInitializeWorkerActionsService,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        InMemoryUnitSuperActionRepositoryService,
        InMemoryBuildingsRepositoryService,
        WorkerHarvestActionManagerService,
        WorkerDeliverActionManagerService,
        WorkerMoveActionManagerService
    ]
};