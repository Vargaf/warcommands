import { UnitGenericDTO } from '../model/unit-generic.dto';
import { UnitTypeENUM } from '../model/unit-type.enum';

export interface WorkerUnitDTO extends UnitGenericDTO {
    type: UnitTypeENUM.Worker;
}