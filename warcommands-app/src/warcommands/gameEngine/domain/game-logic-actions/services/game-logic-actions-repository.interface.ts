import { GameLogicActionFilterDTO } from "../model/game-logic-action-filter.dto";
import { GameLogicActionDTO } from "../model/game-logic-action.dto";

export abstract class GameLogicActionsRepositoryInterface {

    abstract save(action: GameLogicActionDTO): void;

    abstract findBy(filter: GameLogicActionFilterDTO): GameLogicActionDTO[];

    abstract findById(actionId: string): GameLogicActionDTO;

    abstract findAll(): GameLogicActionDTO[];

    abstract remove(action: GameLogicActionDTO): void;

}