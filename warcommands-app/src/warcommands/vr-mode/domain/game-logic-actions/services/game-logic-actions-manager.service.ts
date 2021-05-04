import { GameLogicActionOwnerTypeENUM } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action-owner-type.enum";
import { GameLogicActionDTO } from "src/warcommands/game-middleware/model/game-logic-actions/game-logic-action.dto";
import { GameLogicUnitActionsManager } from "./game-logic-unit-actions-manager.service";

export class GameLogicActionsManager {

    constructor(
        private readonly unitActionsManager: GameLogicUnitActionsManager,
    ) {}

    processAction(action: GameLogicActionDTO): void {

        switch(action.ownerType) {
            case GameLogicActionOwnerTypeENUM.Unit:
                this.unitActionsManager.processAction(action);
                break;
            default:
                throw new Error('Game logic action owner not recognized');
        }
    }

}