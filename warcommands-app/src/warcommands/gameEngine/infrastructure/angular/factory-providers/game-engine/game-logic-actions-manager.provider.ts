import { GameLogicActionsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-actions-manager.service';
import { UnitSuperAcionRepositopriService } from 'src/warcommands/gameEngine/domain/units/unit-actions/unit-super-action-repository.service';
import { InMemoryUnitSuperActionRepositoryService } from '../../../memory-repository/unit/in-memory-unit-super-action-repository.service';
import { GameLogicActionManagerFactoryService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-action-manager-factory.service';
import { GameLogicActionsRepositoryInterface } from 'src/warcommands/gameEngine/domain/game-logic-actions/services/game-logic-actions-repository.interface';
import { InMemoryGameLogicActionsRepositoryService } from '../../../memory-repository/game-logic-actions/in-memory-game-logic-actions-repository.service';
import { GameLogicActionManagerFactory } from 'src/warcommands/gameEngine/domain/game-logic-actions/services/game-logic-action-manager-factory.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';

const factory = (
    unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
    gameLogicActionManagerFactoryService: GameLogicActionManagerFactoryService,
    gameLogicActionsRepositoryService: GameLogicActionsRepositoryInterface,
    gameLogicActionManagerFactory: GameLogicActionManagerFactory,
    unitsRepository: UnitsRepositoryService,
) => {
    return new GameLogicActionsManagerService(
        unitSuperActionRepositoryService,
        gameLogicActionManagerFactoryService,
        gameLogicActionsRepositoryService,
        gameLogicActionManagerFactory,
        unitsRepository,
    );
};

export const provider = {
    provide: GameLogicActionsManagerService,
    useFactory: factory,
    deps: [
        InMemoryUnitSuperActionRepositoryService,
        GameLogicActionManagerFactoryService,
        InMemoryGameLogicActionsRepositoryService,
        GameLogicActionManagerFactory,
        InMemoryUnitsRepositoryService,
    ]
};