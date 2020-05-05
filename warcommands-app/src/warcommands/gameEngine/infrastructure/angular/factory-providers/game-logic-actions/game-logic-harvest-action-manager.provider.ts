import { GameLogicHarvestActionManagerService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-harvest-action-manager.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';

const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
) => {
    return new GameLogicHarvestActionManagerService(
        unitsRepositoryService,
        gameLogicTimeFrameService
    );
};

export const provider = {
    provide: GameLogicHarvestActionManagerService,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        GameLogicTimeFrameService
    ]
};