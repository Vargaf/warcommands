import { GameLogicActionOwnerTypeENUM } from "./game-logic-action-owner-type.enum";
import { GameLogicActionStatusENUM } from "./game-logic-action-status.enum";
import { GameLogicActionTypeENUM } from "./game-logic-action-type.enum";
import { GameLogicActionDTO } from "./game-logic-action.dto";
import { v4 as uuid } from 'uuid';


export interface GameLogicActionVoidDTO extends GameLogicActionDTO {
    type: GameLogicActionTypeENUM.Void;
}

export class GameLogicActionVoidCreator {

    static create(ownerId: string, ownerType: GameLogicActionOwnerTypeENUM): GameLogicActionVoidDTO {
        return {
            id: uuid(),
            ownerType: ownerType,
            ownerId: ownerId,
            parentActionId: '',
            type: GameLogicActionTypeENUM.Void,
            status: GameLogicActionStatusENUM.InProgress,
            data: '',
            activeAction: 0,
            subActionsIdList: []
        };
    }

}