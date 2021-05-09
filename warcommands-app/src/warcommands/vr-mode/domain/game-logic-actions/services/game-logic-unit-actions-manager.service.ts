import { GameLogicActionMoveToDTO } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action-move-to.dto";
import { GameLogicActionTypeENUM } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action-type.enum";
import { GameLogicActionDTO } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action.dto";
import { UnitsManagerService } from "../../units/services/units-manager.service";

export class GameLogicUnitActionsManager {

    constructor(
        private readonly unitsManagerService: UnitsManagerService,
    ) {}

    processAction(action: GameLogicActionDTO): void {

        switch(action.type) {
            case GameLogicActionTypeENUM.MoveTo:
                this.unitsManagerService.unitMoving(action as GameLogicActionMoveToDTO);
                break;
            case GameLogicActionTypeENUM.Void:
                this.unitsManagerService.updateAction(action);
                break;
            default:
                throw new Error('Game logic action type not recognized');
        }
        
    }
}