import { UnitActionGenericDTO } from './unit-action-generic.dto';
import { UnitActionTypeENUM } from './unit-action-type.enum';

export interface UnitActionRewindDTO extends UnitActionGenericDTO {
    type: UnitActionTypeENUM.RewindSuperAction;
}