import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { UnitHarvestActionManager } from 'src/warcommands/gameEngine/domain/game-logic-actions/services/unit-harvest-action-manager.service';

const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
) => {
    return new UnitHarvestActionManager(
        unitsRepositoryService,
        gameLogicTimeFrameService
    );
};

export const provider = {
    provide: UnitHarvestActionManager,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        GameLogicTimeFrameService
    ]
};