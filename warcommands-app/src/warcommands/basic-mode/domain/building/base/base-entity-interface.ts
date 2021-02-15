import { SpawnerBuildingDTO } from '../model/building.dto';
import { BuildingTypeEnum } from '../model/building-type.enum';
import { ResourcesDTO } from '../../share/model/resources.dto';

export interface BaseEntityInterface extends SpawnerBuildingDTO {
    type: BuildingTypeEnum;
    name: string;
    resources: ResourcesDTO;
}
