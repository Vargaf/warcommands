import { GameLogicActionDTO } from "../model/game-logic-action.dto";

export abstract class GameLogicActionManagerInterface {

    abstract createAction(params: any): GameLogicActionDTO;

    abstract initializeAction(action: GameLogicActionDTO): GameLogicActionDTO;

    abstract processAction(action: GameLogicActionDTO): GameLogicActionDTO;

    abstract rewindAction(action: GameLogicActionDTO): GameLogicActionDTO;

    abstract subActionFinished(action: GameLogicActionDTO, subActionId: string): GameLogicActionDTO;

    abstract tearDownAction(action: GameLogicActionDTO): GameLogicActionDTO;

}