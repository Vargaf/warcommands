import { GameLogicService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic.service';
import { GameLogicSpawningUnitsManager } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-spawning-units-manager.service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { PathFindingManagerService } from 'src/warcommands/gameEngine/domain/maps/services/path-finding-manager.service';
import { GameLogicActionsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-actions-manager.service';
import { IdleUnitsManager } from 'src/warcommands/gameEngine/domain/game-engine/sevices/idle-units-manager.service';

const factory = (
    gameLogicSpawningUnitsManager: GameLogicSpawningUnitsManager,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    pathFindingManager: PathFindingManagerService,
    gameLogicActionsManager: GameLogicActionsManagerService,
    idleUnitsManager: IdleUnitsManager,
) => {
    return new GameLogicService(
        gameLogicSpawningUnitsManager,
        gameLogicTimeFrameService,
        pathFindingManager,
        gameLogicActionsManager,
        idleUnitsManager,
    );
};

export const provider = {
    provide: GameLogicService,
    useFactory: factory,
    deps: [
        GameLogicSpawningUnitsManager,
        GameLogicTimeFrameService,
        PathFindingManagerService,
        GameLogicActionsManagerService,
        IdleUnitsManager,
    ]
};
