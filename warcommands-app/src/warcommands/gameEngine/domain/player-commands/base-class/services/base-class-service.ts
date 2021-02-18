import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { UnitTypeENUM } from '../../../units/model/unit-type.enum';
import { EnqueueUnitsManagerService } from '../../../game-engine/sevices/enqueue-units-manager.service';
import { UnitGenericDTO } from '../../../units/model/unit-generic.dto';
import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { QueryFilterDTO } from '../../../share/query-filter.dto';

export class BaseClassService {

    constructor(
        private readonly enqueueUnitsManagerService: EnqueueUnitsManagerService,
        private readonly unitsRepositoryService: UnitsRepositoryService
    ) {}

    createWorker(base: BaseBuildingDTO): UnitGenericDTO {
        return this.enqueueUnitsManagerService.enqueueUnit(UnitTypeENUM.Worker, <string>base.id);
    }

    getWorker(base: BaseBuildingDTO, args: any[], playerId: string): UnitGenericDTO {
        const filter: QueryFilterDTO = {
            playerId: playerId,
            baseId: base.id,
            type: UnitTypeENUM.Worker
        };
        const unitList: UnitGenericDTO[] = this.unitsRepositoryService.findBy(filter);
        const unitIndex = args[0];
        return unitList[unitIndex] || null;
    }

}