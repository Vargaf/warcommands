import { GameLogicWorkerActionsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/game-logic-worker-actions-manager.service';
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