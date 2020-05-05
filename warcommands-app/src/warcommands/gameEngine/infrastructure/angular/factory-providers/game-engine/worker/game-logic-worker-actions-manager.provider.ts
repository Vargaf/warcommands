import { GameLogicWorkerActionsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/game-logic-worker-actions-manager.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../../memory-repository/unit/in-memory-units-repository-service';
import { WorkerMoveActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-move-action-manager.service';
import { MoveToActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/actions/move-to-action-manager-service';
import { UnitSuperAcionRepositopriService } from 'src/warcommands/gameEngine/domain/units/unit-actions/unit-super-action-repository.service';
import { InMemoryUnitSuperActionRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-unit-super-action-repository.service';
import { WorkerHarvestActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-harvest-action-manager.service';
import { WorkerDeliverActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-deliver-action-manager.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/build/in-memory-buildings-repository.service';
import { GameLogicInitializeWorkerActionsService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/game-logic-initialize-worker-actions.service';

const factory = (gameLogicInitializeWorkerActionsService: GameLogicInitializeWorkerActionsService
) => {
    return new GameLogicWorkerActionsManagerService(
        gameLogicInitializeWorkerActionsService
    );
};

export const provider = {
    provide: GameLogicWorkerActionsManagerService,
    useFactory: factory,
    deps: [
        GameLogicInitializeWorkerActionsService
    ]
};