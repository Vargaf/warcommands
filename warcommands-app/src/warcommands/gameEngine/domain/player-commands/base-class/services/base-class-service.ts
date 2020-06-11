import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { UnitTypeENUM } from '../../../units/model/unit-type.enum';
import { EnqueueUnitsManagerService } from '../../../game-engine/sevices/enqueue-units-manager.service';
import { UnitGenericDTO } from '../../../units/model/unit-generic.dto';

export class BaseClassService {

    constructor(
        private readonly enqueueUnitsManagerService: EnqueueUnitsManagerService
    ) {}

    createWorker(base: BaseBuildingDTO): UnitGenericDTO {
        return this.enqueueUnitsManagerService.enqueueUnit(UnitTypeENUM.Worker, base.id);
    }

}