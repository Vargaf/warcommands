import { BuildingTypeEnum } from './building-type.enum';
import { SpawnerBuildingDTO } from './building.dto';
import { ResourcesDTO } from '../resources/reources.dto';

export interface BaseBuildingDTO extends SpawnerBuildingDTO {
    type: BuildingTypeEnum;
    name: string;
    
    resources: ResourcesDTO;
}