import { GameLogicActionOwnerTypeENUM } from "./game-logic-action-owner-type.enum";
import { GameLogicActionTypeENUM } from "./game-logic-action-type.enum";
import { GameLogicActionDTO } from "./game-logic-action.dto";
import { v4 as uuid } from 'uuid';
import { GameLogicActionStatusENUM } from "./game-logic-action-status.enum";


export interface GameLogicActionRewindDTO extends GameLogicActionDTO {
    type: GameLogicActionTypeENUM.Rewind;
}

export class GameLogicActionRewindInitializer {

    static create(ownerId: string, ownerType: GameLogicActionOwnerTypeENUM): GameLogicActionRewindDTO {
        return {
            id: uuid(),
            type: GameLogicActionTypeENUM.Rewind,
            ownerType: ownerType,
            ownerId: ownerId,
            status: GameLogicActionStatusENUM.Created,
            data: null,
            activeAction: 0,
            parentActionId: null,
            subActionsIdList: []
        }
    }

}