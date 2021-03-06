import { CoordinatesEntity } from "../../maps/model/coordinates.entity";
import { GameLogicActionTypeENUM } from "./game-logic-action-type.enum";
import { GameLogicActionDTO } from "./game-logic-action.dto";

export interface GameLogicActionUnitHarvestDTO extends GameLogicActionDTO {
    type: GameLogicActionTypeENUM.Harvest;
    data: {
        started: number,
        finished: number,
        buildingId: string,
        coordinates: CoordinatesEntity
    }
}