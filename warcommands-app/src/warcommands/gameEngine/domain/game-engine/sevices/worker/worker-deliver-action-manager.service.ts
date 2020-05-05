import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { UnitActionGenericDTO } from '../../../units/unit-actions/unit-action-generic.dto';
import { UnitActionHarvestDTO } from '../../../units/unit-actions/unit-action-harvest.dto';
import { UnitActionTypeENUM } from '../../../units/unit-actions/unit-action-type.enum';
import { UnitActionStatusENUM } from '../../../units/unit-actions/unit-action-status.enum';
import { GameLogicTimeFrameService } from '../game-logic-time-frame.service';
import { UnitActionDeliverDTO } from '../../../units/unit-actions/unit-action-deliver.dto';
import { v4 as uuid } from 'uuid';

export class WorkerDeliverActionManagerService {
    
    constructor() {}

    deliver(worker: WorkerUnitDTO): UnitActionGenericDTO {

        const action: UnitActionDeliverDTO = {
            id: uuid(),
            type: UnitActionTypeENUM.Deliver,
            actionStatus: UnitActionStatusENUM.WaitingToStart,
            data: {
                started: 0,
                finished: 0
            }
        }

        return action;
    }

}