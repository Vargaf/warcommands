import { BuildingsRepositoryService } from "src/warcommands/gameEngine/domain/building/services/buildings-repository.service";
import { FarmBuildingManager } from "src/warcommands/gameEngine/domain/building/services/farm-building-manager.service";
import { UnitHarvestActionManager } from "src/warcommands/gameEngine/domain/game-logic-actions/services/unit-harvest-action-manager.service";
import { UnitGoHarvestAndComeBackActionManager } from "src/warcommands/gameEngine/domain/game-logic-actions/services/unit-go-harvest-and-come-back-action-manager.service";
import { UnitMoveActionManager } from "src/warcommands/gameEngine/domain/game-logic-actions/services/unit-move-action-manager.service";
import { UnitsRepositoryService } from "src/warcommands/gameEngine/domain/units/services/units-repository.service";
import { InMemoryBuildingsRepositoryService } from "../../../memory-repository/build/in-memory-buildings-repository.service";
import { InMemoryUnitsRepositoryService } from "../../../memory-repository/unit/in-memory-units-repository-service";
import { UnitDeliverActionManager } from "src/warcommands/gameEngine/domain/game-logic-actions/services/unit-deliver-action-manager.service";
import { GameLogicActionsRepositoryInterface } from "src/warcommands/gameEngine/domain/game-logic-actions/services/game-logic-actions-repository.interface";
import { InMemoryGameLogicActionsRepositoryService } from "../../../memory-repository/game-logic-actions/in-memory-game-logic-actions-repository.service";


const factory = (
    buildingsRepositoryService: BuildingsRepositoryService,
    unitsRepositoryService: UnitsRepositoryService,
    gameLogicHarvestActionManager: UnitHarvestActionManager,
    unitMoveActionManager: UnitMoveActionManager,
    farmBuildingManager: FarmBuildingManager,
    unitDeliverActionManager: UnitDeliverActionManager,
    gamelogicActionRepository: GameLogicActionsRepositoryInterface,
) => {
    return new UnitGoHarvestAndComeBackActionManager(
        buildingsRepositoryService,
        unitsRepositoryService,
        gameLogicHarvestActionManager,
        unitMoveActionManager,
        farmBuildingManager,
        unitDeliverActionManager,
        gamelogicActionRepository,
    );
};

export const provider = {
    provide: UnitGoHarvestAndComeBackActionManager,
    useFactory: factory,
    deps: [
        InMemoryBuildingsRepositoryService,
        InMemoryUnitsRepositoryService,
        UnitHarvestActionManager,
        UnitMoveActionManager,
        FarmBuildingManager,
        UnitDeliverActionManager,
        InMemoryGameLogicActionsRepositoryService,
    ]
};