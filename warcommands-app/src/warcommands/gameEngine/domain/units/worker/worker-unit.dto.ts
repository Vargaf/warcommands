import { UnitGenericDTO } from '../model/unit-generic.dto';
import { UnitTypeENUM } from '../model/unit-type.enum';
import { WorkerUnitRoleENUM } from './worker-unit-role.enum';

export interface WorkerUnitDTO extends UnitGenericDTO {
    type: UnitTypeENUM.Worker;
    role: WorkerUnitRoleENUM;
}