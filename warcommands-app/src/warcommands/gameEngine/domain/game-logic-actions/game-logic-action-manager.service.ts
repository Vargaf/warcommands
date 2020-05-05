import { UnitActionGenericDTO } from '../units/unit-actions/unit-action-generic.dto';

export abstract class GameLogicActionManagerService {

    abstract initializeAction(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO; 

    abstract actionInProgress(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO; 

}