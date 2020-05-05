import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { UnitActionGenericDTO } from '../../../units/unit-actions/unit-action-generic.dto';
import { UnitActionHarvestDTO } from '../../../units/unit-actions/unit-action-harvest.dto';
import { UnitActionTypeENUM } from '../../../units/unit-actions/unit-action-type.enum';
import { UnitActionStatusENUM } from '../../../units/unit-actions/unit-action-status.enum';
import { GameLogicTimeFrameService } from '../game-logic-time-frame.service';
import { v4 as uuid } from 'uuid';

export class WorkerHarvestActionManagerService {
    
    constructor() {}

    harvest(worker: WorkerUnitDTO): UnitActionGenericDTO {

        const action: UnitActionHarvestDTO = {
            id: uuid(),
            type: UnitActionTypeENUM.Harvest,
            actionStatus: UnitActionStatusENUM.WaitingToStart,
            data: {
                started: 0,
                finished: 0
            }
        }

        return action;
    }

}