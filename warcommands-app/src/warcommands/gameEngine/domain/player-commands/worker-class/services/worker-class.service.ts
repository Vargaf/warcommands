import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { WorkerUnitRoleENUM } from '../../../units/worker/worker-unit-role.enum';

export class WorkerClassService {

    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService
    ) {}

    setRole(unit: WorkerUnitDTO, role: string): void {
        if (unit) {
            unit.role = WorkerUnitRoleENUM[role];
            this.unitsRepositoryService.save(unit);

        }
    }

}