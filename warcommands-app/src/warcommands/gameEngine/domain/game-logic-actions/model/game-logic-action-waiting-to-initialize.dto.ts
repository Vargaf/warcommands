import { GameLogicActionOwnerTypeENUM } from "./game-logic-action-owner-type.enum";
import { GameLogicActionTypeENUM } from "./game-logic-action-type.enum";
import { GameLogicActionDTO } from "./game-logic-action.dto";
import { v4 as uuid } from 'uuid';
import { GameLogicActionStatusENUM } from "./game-logic-action-status.enum";


export interface GameLogicActionWaitingToInitialize extends GameLogicActionDTO {
    type: GameLogicActionTypeENUM.WaitingToInitialize;
}

export class GameLogicActionWaitingToInitializeInitializer {

    static create(ownerId: string, ownerType: GameLogicActionOwnerTypeENUM): GameLogicActionWaitingToInitialize {
        return {
            id: uuid(),
            type: GameLogicActionTypeENUM.WaitingToInitialize,
            ownerType: ownerType,
            ownerId: ownerId,
            status: GameLogicActionStatusENUM.Initializing,
            data: null,
            activeAction: 0,
            parentActionId: null,
        }
    }

}