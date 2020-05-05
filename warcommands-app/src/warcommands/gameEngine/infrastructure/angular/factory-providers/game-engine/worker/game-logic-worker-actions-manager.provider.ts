import { GameLogicWorkerActionsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/game-logic-worker-actions-manager.service';
import { GameLogicInitializeWorkerHarvestActionsService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/game-logic-initialize-worker-harvest-actions.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-units-repository-service';
import { UnitSuperAcionRepositopriService } from 'src/warcommands/gameEngine/domain/units/unit-actions/unit-super-action-repository.service';
import { InMemoryUnitSuperActionRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-unit-super-action-repository.service';

const factory = (
    gameLogicInitializeWorkerActionsService: GameLogicInitializeWorkerHarvestActionsService,
    unitsRepositoryService: UnitsRepositoryService,
    unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
) => {
    return new GameLogicWorkerActionsManagerService(
        gameLogicInitializeWorkerActionsService,
        unitsRepositoryService,
        unitSuperActionRepositoryService
    );
};

export const provider = {
    provide: GameLogicWorkerActionsManagerService,
    useFactory: factory,
    deps: [
        GameLogicInitializeWorkerHarvestActionsService,
        InMemoryUnitsRepositoryService,
        InMemoryUnitSuperActionRepositoryService
    ]
};