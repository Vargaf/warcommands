import { GameLogicService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic.service';
import { GameLogicSpawningUnitsManager } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-spawning-units-manager.service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { GameLogicWorkerActionsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/worker/game-logic-worker-actions-manager.service';
import { PathFindingManagerService } from 'src/warcommands/gameEngine/domain/maps/services/path-finding-manager.service';
import { GameLogicActionsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-actions-manager.service';

const factory = (
    gameLogicSpawningUnitsManager: GameLogicSpawningUnitsManager,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    gameLogicWorkerActionsManager: GameLogicWorkerActionsManagerService,
    pathFindingManager: PathFindingManagerService,
    gameLogicActionsManager: GameLogicActionsManagerService
) => {
    return new GameLogicService(
        gameLogicSpawningUnitsManager,
        gameLogicTimeFrameService,
        gameLogicWorkerActionsManager,
        pathFindingManager,
        gameLogicActionsManager
    );
};

export const provider = {
    provide: GameLogicService,
    useFactory: factory,
    deps: [
        GameLogicSpawningUnitsManager,
        GameLogicTimeFrameService,
        GameLogicWorkerActionsManagerService,
        PathFindingManagerService,
        GameLogicActionsManagerService
    ]
};
