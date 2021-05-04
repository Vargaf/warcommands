import { GameLogicActionOwnerTypeENUM } from "./game-logic-action-owner-type.enum";
import { GameLogicActionStatusENUM } from "./game-logic-action-status.enum";
import { GameLogicActionTypeENUM } from "./game-logic-action-type.enum";

export interface GameLogicActionFilterDTO {
    id?: string;
    ownerType?: GameLogicActionOwnerTypeENUM;
    ownerId?: string;
    type?: GameLogicActionTypeENUM;
	status?: GameLogicActionStatusENUM;
}