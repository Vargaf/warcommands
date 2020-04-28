import { UnitGenericDTO } from '../unit-generic.dto';
import { UnitTypeENUM } from '../unit-type.enum';

export interface WorkerUnitDTO extends UnitGenericDTO {
    type: UnitTypeENUM.Worker
}
