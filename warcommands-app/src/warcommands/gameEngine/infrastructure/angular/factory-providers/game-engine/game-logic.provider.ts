import { GameLogicService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic.service';
import { GameLogicSpawningUnitsManager } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-spawning-units-manager.service';

const factory = (
    gameLogicSpawningUnitsManager: GameLogicSpawningUnitsManager
) => {
    return new GameLogicService(
        gameLogicSpawningUnitsManager
    );
};

export const provider = {
    provide: GameLogicService,
    useFactory: factory,
    deps: [
        GameLogicSpawningUnitsManager
    ]
};
