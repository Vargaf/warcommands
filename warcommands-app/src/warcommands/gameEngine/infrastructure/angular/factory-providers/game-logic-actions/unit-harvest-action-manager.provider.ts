import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { UnitHarvestActionManager } from 'src/warcommands/gameEngine/domain/game-logic-actions/services/unit-harvest-action-manager.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { FarmBuildingManager } from 'src/warcommands/gameEngine/domain/building/services/farm-building-manager.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';

const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    buildingsRepositoryService: BuildingsRepositoryService,
    farmBuildingManager: FarmBuildingManager,
    gameEventBusService: GameEventBusService
) => {
    return new UnitHarvestActionManager(
        unitsRepositoryService,
        gameLogicTimeFrameService,
        buildingsRepositoryService,
        farmBuildingManager,
        gameEventBusService,
    );
};

export const provider = {
    provide: UnitHarvestActionManager,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        GameLogicTimeFrameService,
        InMemoryBuildingsRepositoryService,
        FarmBuildingManager,
        GameEventBusService,
    ]
};