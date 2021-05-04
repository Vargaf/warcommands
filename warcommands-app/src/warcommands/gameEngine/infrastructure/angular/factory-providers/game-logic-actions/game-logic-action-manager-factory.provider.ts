import { GameLogicActionManagerFactory } from "src/warcommands/gameEngine/domain/game-logic-actions/services/game-logic-action-manager-factory.service";
import { UnitDeliverActionManager } from "src/warcommands/gameEngine/domain/game-logic-actions/services/unit-deliver-action-manager.service";
import { UnitGoHarvestAndComeBackActionManager } from "src/warcommands/gameEngine/domain/game-logic-actions/services/unit-go-harvest-and-come-back-action-manager.service";
import { UnitHarvestActionManager } from "src/warcommands/gameEngine/domain/game-logic-actions/services/unit-harvest-action-manager.service";
import { UnitMoveActionManager } from "src/warcommands/gameEngine/domain/game-logic-actions/services/unit-move-action-manager.service";


const factory = (
    unitMoveActionManager: UnitMoveActionManager,
    unitHarvestActionManager: UnitHarvestActionManager,
    unitDeliverActionManager: UnitDeliverActionManager,
    unitGoHarvestAndComeBackActionManager: UnitGoHarvestAndComeBackActionManager,
) => {
    return new GameLogicActionManagerFactory(
        unitMoveActionManager,
        unitHarvestActionManager,
        unitDeliverActionManager,
        unitGoHarvestAndComeBackActionManager,
    );
};

export const provider = {
    provide: GameLogicActionManagerFactory,
    useFactory: factory,
    deps: [
        UnitMoveActionManager,
        UnitHarvestActionManager,
        UnitDeliverActionManager,
        UnitGoHarvestAndComeBackActionManager,
    ]
};