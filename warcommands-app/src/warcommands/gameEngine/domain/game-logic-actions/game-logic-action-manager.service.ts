import { UnitActionGenericDTO } from '../units/unit-actions/unit-action-generic.dto';
import { UnitActionStatusENUM } from '../units/unit-actions/unit-action-status.enum';

export abstract class GameLogicActionManagerService {

    abstract initializeAction(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO; 

    abstract actionInProgress(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO; 

    actionFinished (action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO {
        action.actionStatus = UnitActionStatusENUM.WaitingToStart;
        return action;
    }

}