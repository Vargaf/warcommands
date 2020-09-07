import { GameLogicActionManagerService } from './game-logic-action-manager.service';
import { UnitActionGenericDTO } from '../units/unit-actions/unit-action-generic.dto';

export class GameLogicRewindActionManagerService extends GameLogicActionManagerService {

    constructor() {
        super();
    }

    initializeAction(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO {
        return action;
    } 

    actionInProgress(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO {
        return action;
    } 

}