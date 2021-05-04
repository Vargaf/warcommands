import { GameLogicActionTypeENUM } from "../model/game-logic-action-type.enum";
import { GameLogicActionDTO } from "../model/game-logic-action.dto";
import { GameLogicActionManagerInterface } from "./game-logic-action-manager.interface";
import { UnitDeliverActionManager } from "./unit-deliver-action-manager.service";
import { UnitGoHarvestAndComeBackActionManager } from "./unit-go-harvest-and-come-back-action-manager.service";
import { UnitHarvestActionManager } from "./unit-harvest-action-manager.service";
import { UnitMoveActionManager } from "./unit-move-action-manager.service";

export class GameLogicActionManagerFactory {

    constructor(
        private readonly unitMoveActionManager: UnitMoveActionManager,
        private readonly unitHarvestActionManager: UnitHarvestActionManager,
        private readonly unitDeliverActionManager: UnitDeliverActionManager,
        private readonly unitGoHarvestAndComeBackActionManager: UnitGoHarvestAndComeBackActionManager,
    ) {}

    getActionManager(action: GameLogicActionDTO): GameLogicActionManagerInterface {

        let actionManager!: GameLogicActionManagerInterface;

        switch(action.type) {
            case GameLogicActionTypeENUM.MoveTo:
                actionManager = this.unitMoveActionManager;
                break;
            case GameLogicActionTypeENUM.Harvest:
                actionManager = this.unitHarvestActionManager;
                break;
            case GameLogicActionTypeENUM.Deliver:
                actionManager = this.unitDeliverActionManager;
                break;
            case GameLogicActionTypeENUM.UnitGoHarvestAndComeBack:
                actionManager = this.unitGoHarvestAndComeBackActionManager;
                break;
            default:
                throw new Error('Action manager not found: ' + action.type);
        }
        
        return actionManager;
    }

}