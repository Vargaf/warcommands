import { GameLogicActionsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-actions-manager.service';
import { UnitSuperAcionRepositopriService } from 'src/warcommands/gameEngine/domain/units/unit-actions/unit-super-action-repository.service';
import { InMemoryUnitSuperActionRepositoryService } from '../../../memory-repository/unit/in-memory-unit-super-action-repository.service';
import { GameLogicActionManagerFactoryService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-action-manager-factory.service';

const factory = (
    unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
    gameLogicActionManagerFactoryService: GameLogicActionManagerFactoryService
) => {
    return new GameLogicActionsManagerService(
        unitSuperActionRepositoryService,
        gameLogicActionManagerFactoryService
    );
};

export const provider = {
    provide: GameLogicActionsManagerService,
    useFactory: factory,
    deps: [
        InMemoryUnitSuperActionRepositoryService,
        GameLogicActionManagerFactoryService
    ]
};