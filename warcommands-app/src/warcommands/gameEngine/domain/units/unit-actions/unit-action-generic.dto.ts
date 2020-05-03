import { UnitActionTypeENUM } from './unit-action-type.enum';
import { UnitActionStatusENUM } from './unit-action-status.enum';

export interface UnitActionGenericDTO {
    type: UnitActionTypeENUM;
    actionStatus: UnitActionStatusENUM;
    data: any;
}