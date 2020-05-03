import { GameLogicWorkerActionsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/game-logic-worker-actions-manager.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../../memory-repository/unit/in-memory-units-repository-service';
import { WorkerMoveActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/worker-move-action-manager.service';
import { MoveToActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/actions/move-to-action-manager-service';

const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    workerMoveActionManager: WorkerMoveActionManagerService,
    moveToActionManager: MoveToActionManagerService
) => {
    return new GameLogicWorkerActionsManagerService(
        unitsRepositoryService,
        workerMoveActionManager,
        moveToActionManager
    );
};

export const provider = {
    provide: GameLogicWorkerActionsManagerService,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        WorkerMoveActionManagerService,
        MoveToActionManagerService
    ]
};