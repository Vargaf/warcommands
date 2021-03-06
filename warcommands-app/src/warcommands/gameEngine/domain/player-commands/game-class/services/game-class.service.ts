import { BuildingsRepositoryService } from '../../../building/services/buildings-repository.service';
import { BuildingDTO } from '../../../building/model/building.dto';
import { BuildingTypeEnum } from '../../../building/model/building-type.enum';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';

export class GameClassService {

    constructor(
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
    ) {}

    getBaseByName(args: any[], playerId: string): BaseBuildingDTO {
        const baseList: BuildingDTO[] = this.buildingsRepositoryService.findByTypePlayer(BuildingTypeEnum.Base, playerId);

        let foundBase!: BaseBuildingDTO;
        for (const base of baseList) {
            if((base as BaseBuildingDTO).name === args[0]) {
                foundBase = { ...(base as BaseBuildingDTO) };
                break;
            }
        }

        return foundBase;
    }

}