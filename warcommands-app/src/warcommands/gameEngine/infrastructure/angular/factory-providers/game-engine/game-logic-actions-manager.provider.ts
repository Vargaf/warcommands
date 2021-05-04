import { GameLogicActionsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-actions-manager.service';
import { GameLogicActionsRepositoryInterface } from 'src/warcommands/gameEngine/domain/game-logic-actions/services/game-logic-actions-repository.interface';
import { InMemoryGameLogicActionsRepositoryService } from '../../../memory-repository/game-logic-actions/in-memory-game-logic-actions-repository.service';
import { GameLogicActionManagerFactory } from 'src/warcommands/gameEngine/domain/game-logic-actions/services/game-logic-action-manager-factory.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';

const factory = (
    gameLogicActionsRepositoryService: GameLogicActionsRepositoryInterface,
    gameLogicActionManagerFactory: GameLogicActionManagerFactory,
    unitsRepository: UnitsRepositoryService,
) => {
    return new GameLogicActionsManagerService(
        gameLogicActionsRepositoryService,
        gameLogicActionManagerFactory,
        unitsRepository,
    );
};

export const provider = {
    provide: GameLogicActionsManagerService,
    useFactory: factory,
    deps: [
        InMemoryGameLogicActionsRepositoryService,
        GameLogicActionManagerFactory,
        InMemoryUnitsRepositoryService,
    ]
};