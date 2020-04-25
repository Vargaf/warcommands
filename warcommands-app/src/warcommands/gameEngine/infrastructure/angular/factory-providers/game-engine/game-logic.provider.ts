import { GameLogicService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic.service';
import { GameLogicSpawningUnitsManager } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-spawning-units-manager.service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';

const factory = (
    gameLogicSpawningUnitsManager: GameLogicSpawningUnitsManager,
    gameLogicTimeFrameService: GameLogicTimeFrameService
) => {
    return new GameLogicService(
        gameLogicSpawningUnitsManager,
        gameLogicTimeFrameService
    );
};

export const provider = {
    provide: GameLogicService,
    useFactory: factory,
    deps: [
        GameLogicSpawningUnitsManager,
        GameLogicTimeFrameService
    ]
};
