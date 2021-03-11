import { SpawnerBuildingDTO } from './building.dto';
import { BuildingTypeEnum } from './building-type.enum';
import { ResourcesDTO } from '../resources/reources.dto';

export interface BaseEntityInterface extends SpawnerBuildingDTO {
    type: BuildingTypeEnum;
    name: string;
    resources: ResourcesDTO;
}
