import { GameLogicActionTypeENUM } from "./game-logic-action-type.enum";
import { GameLogicActionDTO } from "./game-logic-action.dto";

export interface GameLogicActionUnitGoHarvestAndComeBackDTO extends GameLogicActionDTO{
    type: GameLogicActionTypeENUM.UnitGoHarvestAndComeBack;
}