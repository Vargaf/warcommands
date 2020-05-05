import { UnitActionTypeENUM } from './unit-action-type.enum';
import { UnitActionStatusENUM } from './unit-action-status.enum';

export interface UnitActionGenericDTO {
    id: string;
    type: UnitActionTypeENUM;
    actionStatus: UnitActionStatusENUM;
    data: any;
}