import { GameLogicActionOwnerTypeENUM } from "./game-logic-action-owner-type.enum";
import { GameLogicActionStatusENUM } from "./game-logic-action-status.enum";
import { GameLogicActionTypeENUM } from "./game-logic-action-type.enum";
import { GameLogicActionDTO } from "./game-logic-action.dto";

export interface GameLogicActionVoidDTO extends GameLogicActionDTO {
    type: GameLogicActionTypeENUM.Void;
}

export class GameLogicActionVoidCreator {

    static create(): GameLogicActionVoidDTO {
        return {
            id: '',
            ownerType: GameLogicActionOwnerTypeENUM.Unit,
            ownerId: '',
            type: GameLogicActionTypeENUM.Void,
            status: GameLogicActionStatusENUM.InProgress,
            data: '',
            activeAction: 0,
            subActionsIdList: [],
            parentActionId: ''
        };
    }

}