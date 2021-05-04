import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { UnitDeliverActionManager } from 'src/warcommands/gameEngine/domain/game-logic-actions/services/unit-deliver-action-manager.service';

const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    buildingsRepositoryService: BuildingsRepositoryService,
    gameEventBusService: GameEventBusService
) => {
    return new UnitDeliverActionManager(
        unitsRepositoryService,
        gameLogicTimeFrameService,
        buildingsRepositoryService,
        gameEventBusService
    );
};

export const provider = {
    provide: UnitDeliverActionManager,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        GameLogicTimeFrameService,
        InMemoryBuildingsRepositoryService,
        GameEventBusService
    ]
};