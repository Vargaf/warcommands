import { CoordinatesEntity } from "../map/coordinates.entity";
import { GameLogicActionTypeENUM } from "./game-logic-action-type.enum";
import { GameLogicActionDTO } from "./game-logic-action.dto";

export interface GameLogicActionUnitDeliverDTO extends GameLogicActionDTO {
    type: GameLogicActionTypeENUM.Deliver;
    data: {
        started: number,
        finished: number,
        coordinates: CoordinatesEntity;
    }
}