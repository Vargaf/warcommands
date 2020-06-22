import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { WorkerUnitRoleENUM } from '../../../units/worker/worker-unit-role.enum';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { UnitTypeENUM } from '../../../units/model/unit-type.enum';
import { QueryFilterDTO } from '../../../share/query-filter.dto';

export class WorkerClassService {

    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
    ) {}

    setRole(unit: WorkerUnitDTO, role: WorkerUnitRoleENUM): WorkerUnitDTO {
        if (unit) {
            if (unit.role !== role) {
                unit.action = null;
                unit.role = role;
                this.unitsRepositoryService.save(unit);
            }
        }

        return unit;
    }

    getWorkerList(args: any[], base: BaseBuildingDTO): WorkerUnitDTO[] {

        const queryFilter: QueryFilterDTO = {
            playerId: base.playerId,
            baseId: base.id,
            type: UnitTypeENUM.Worker,
            role: args[0]
        };

        const workerList: WorkerUnitDTO[] = (this.unitsRepositoryService.findBy(queryFilter) as WorkerUnitDTO[]);

        return workerList;
    }

    filterByRole(workerList: WorkerUnitDTO[], role: string): WorkerUnitDTO[] {
        const filteredList: WorkerUnitDTO[] = [];

        workerList.forEach((worker) => {
            if (worker.role === role) {
                filteredList.push(worker);
            }
        });

        return filteredList;
    }

}