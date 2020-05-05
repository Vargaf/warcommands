import { UnitActionGenericDTO } from './unit-action-generic.dto';
import { UnitActionTypeENUM } from './unit-action-type.enum';

export interface UnitActionHarvestDTO extends UnitActionGenericDTO {
    type: UnitActionTypeENUM.Harvest;
    data: {
        started: number;
        finished: number;
    },
}