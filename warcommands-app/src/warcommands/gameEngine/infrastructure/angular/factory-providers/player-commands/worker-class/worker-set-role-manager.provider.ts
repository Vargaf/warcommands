import { WorkerSetRoleManagerService } from "../../../../../domain/player-commands/worker-class/services/worker-set-role-manager.service";
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-units-repository-service';
import { GameLogicActionsManagerService } from "src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-actions-manager.service";


const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    gameLogicActionsManager: GameLogicActionsManagerService
) => {
    return new WorkerSetRoleManagerService(
        unitsRepositoryService,
        gameLogicActionsManager,
    );
};

export const provider = {
    provide: WorkerSetRoleManagerService,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        GameLogicActionsManagerService,
    ]
};