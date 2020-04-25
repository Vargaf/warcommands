import { BuildingTypeEnum } from '../model/building-type.enum';
import { SpawnerBuildingDTO } from '../model/building.dto';
import { ResourcesDTO } from '../../share/reources.dto';

export interface BaseBuildingDTO extends SpawnerBuildingDTO {
    type: BuildingTypeEnum;
    name: string;
    
    resources: ResourcesDTO;
}