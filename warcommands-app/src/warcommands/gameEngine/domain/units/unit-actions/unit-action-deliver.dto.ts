import { UnitActionGenericDTO } from './unit-action-generic.dto';
import { UnitActionTypeENUM } from './unit-action-type.enum';

export interface UnitActionDeliverDTO extends UnitActionGenericDTO {
    type: UnitActionTypeENUM.Deliver;
    data: {
        started: number;
        finished: number;
    }
}