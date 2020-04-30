import { BuildingsRepositoryService } from '../../../building/services/buildings-repository.service';
import { BuildingDTO } from '../../../building/model/building.dto';
import { BuildingTypeEnum } from '../../../building/model/building-type.enum';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { UnitGenericDTO } from '../../../units/model/unit-generic.dto';
import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { UnitTypeENUM } from '../../../units/model/unit-type.enum';

export class GameClassService {

    constructor(
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly unitsRepositoryService: UnitsRepositoryService
    ) {}

    getBaseByName(args: any[], playerId: string): BaseBuildingDTO {
        const baseList: BuildingDTO[] = this.buildingsRepositoryService.findByTypePlayer(BuildingTypeEnum.Base, playerId);

        let foundBase: BaseBuildingDTO = null;
        for (const base of baseList) {
            if((base as BaseBuildingDTO).name === args[0]) {
                foundBase = { ...(base as BaseBuildingDTO) };
            }
        }

        return foundBase;
    }

    getWorker(args: any[], playerId: string): UnitGenericDTO {
        const unitList: UnitGenericDTO[] = this.unitsRepositoryService.findByTypeAndPlayer(UnitTypeENUM.Worker, playerId);
        const unitIndex = args[0];
        return unitList[unitIndex] || null;
    }

}