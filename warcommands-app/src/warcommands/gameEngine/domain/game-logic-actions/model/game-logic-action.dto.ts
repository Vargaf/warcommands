import { GameLogicActionOwnerTypeENUM } from "./game-logic-action-owner-type.enum";
import { GameLogicActionStatusENUM } from "./game-logic-action-status.enum";
import { GameLogicActionTypeENUM } from "./game-logic-action-type.enum";

export interface GameLogicActionDTO {
    id: string;
    ownerType: GameLogicActionOwnerTypeENUM;
    ownerId: string;
    parentActionId: string | null;
    type: GameLogicActionTypeENUM;
	status: GameLogicActionStatusENUM;
	data: any;
	activeAction: number;
	subActionsIdList?: string[];
}