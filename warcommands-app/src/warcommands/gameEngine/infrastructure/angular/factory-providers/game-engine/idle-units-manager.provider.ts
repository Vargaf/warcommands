import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';
import { FarmBuildingManager } from 'src/warcommands/gameEngine/domain/building/services/farm-building-manager.service';
import { IdleUnitsManager } from 'src/warcommands/gameEngine/domain/game-engine/sevices/idle-units-manager.service';
import { GameLogicActionsRepositoryInterface } from 'src/warcommands/gameEngine/domain/game-logic-actions/services/game-logic-actions-repository.interface';
import { UnitGoHarvestAndComeBackActionManager } from 'src/warcommands/gameEngine/domain/game-logic-actions/services/unit-go-harvest-and-come-back-action-manager.service';
import { UnitMoveActionManager } from 'src/warcommands/gameEngine/domain/game-logic-actions/services/unit-move-action-manager.service';
import { MapBlockedTilesManagerService } from 'src/warcommands/gameEngine/domain/maps/services/map-blocked-tiles-manager.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { InMemoryGameLogicActionsRepositoryService } from '../../../memory-repository/game-logic-actions/in-memory-game-logic-actions-repository.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';

const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    buildingsRepositoryService: BuildingsRepositoryService,
    unitMoveActionManager: UnitMoveActionManager,
    mapBlockedTilesManagerService: MapBlockedTilesManagerService,
    unitGoHarvestAndComeBackActionManager: UnitGoHarvestAndComeBackActionManager,
    gameLogicActionRepository: GameLogicActionsRepositoryInterface,
    farmBuildingManager: FarmBuildingManager,
) => {
    return new IdleUnitsManager(
        unitsRepositoryService,
        buildingsRepositoryService,
        unitMoveActionManager,
        mapBlockedTilesManagerService,
        unitGoHarvestAndComeBackActionManager,
        gameLogicActionRepository,
        farmBuildingManager,
    );
};

export const provider = {
    provide: IdleUnitsManager,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        InMemoryBuildingsRepositoryService,
        UnitMoveActionManager,
        MapBlockedTilesManagerService,
        UnitGoHarvestAndComeBackActionManager,
        InMemoryGameLogicActionsRepositoryService,
        FarmBuildingManager,
    ]
};