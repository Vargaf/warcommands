import { GameLogicActionManagerFactoryService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-action-manager-factory.service';
import { GameLogicMoveToActionManagerService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-move-to-action-manager.service';
import { GameLogicHarvestActionManagerService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-harvest-action-manager.service';
import { GameLogicDeliverActionManagerService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-deliver-action-manager.service';

const factory = (
    gameLogicMoveToActionManagerService: GameLogicMoveToActionManagerService,
    gameLogicHarvesActionManagerService: GameLogicHarvestActionManagerService,
    gameLogicDeliverActionManagerService: GameLogicDeliverActionManagerService
) => {
    return new GameLogicActionManagerFactoryService(
        gameLogicMoveToActionManagerService,
        gameLogicHarvesActionManagerService,
        gameLogicDeliverActionManagerService,
    );
};

export const provider = {
    provide: GameLogicActionManagerFactoryService,
    useFactory: factory,
    deps: [
        GameLogicMoveToActionManagerService,
        GameLogicHarvestActionManagerService,
        GameLogicDeliverActionManagerService
    ]
};