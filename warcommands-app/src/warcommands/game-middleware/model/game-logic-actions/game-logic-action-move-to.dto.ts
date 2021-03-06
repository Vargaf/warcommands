import { CoordinatesEntity } from "../map/coordinates.entity";
import { PathFindingCoordinate } from "../map/path-finding-coordinate.dto";
import { GameLogicActionTypeENUM } from "./game-logic-action-type.enum";
import { GameLogicActionDTO } from "./game-logic-action.dto";

export interface GameLogicActionMoveToDTO extends GameLogicActionDTO {
    type: GameLogicActionTypeENUM.MoveTo;
    data: {
        from: CoordinatesEntity,
        to: CoordinatesEntity,
        path: PathFindingCoordinate[],
        currentPathStep: number,
    };
}