import { GameLogicInitializeWorkerHarvestActionsService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/game-logic-initialize-worker-harvest-actions.service';
import { UnitSuperAcionRepositopriService } from 'src/warcommands/gameEngine/domain/units/unit-actions/unit-super-action-repository.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { InMemoryUnitSuperActionRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-unit-super-action-repository.service';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/build/in-memory-buildings-repository.service';
import { GameLogicHarvestActionManagerService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-harvest-action-manager.service';
import { GameLogicDeliverActionManagerService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-deliver-action-manager.service';
import { GameLogicMoveToActionManagerService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-move-to-action-manager.service';


const factory = (
    unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
    buildingsRepositoryService: BuildingsRepositoryService,
    gameLogicHarvestActionManager: GameLogicHarvestActionManagerService,
    gameLogicDeliverActionManager: GameLogicDeliverActionManagerService,
    gameLogicMoveToActionManager: GameLogicMoveToActionManagerService
) => {
    return new GameLogicInitializeWorkerHarvestActionsService(
        unitSuperActionRepositoryService,
        buildingsRepositoryService,
        gameLogicHarvestActionManager,
        gameLogicDeliverActionManager,
        gameLogicMoveToActionManager
    );
};

export const provider = {
    provide: GameLogicInitializeWorkerHarvestActionsService,
    useFactory: factory,
    deps: [
        InMemoryUnitSuperActionRepositoryService,
        InMemoryBuildingsRepositoryService,
        GameLogicHarvestActionManagerService,
        GameLogicDeliverActionManagerService,
        GameLogicMoveToActionManagerService
    ]
};