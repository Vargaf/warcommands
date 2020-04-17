import { BuildingTypeEnum } from '../model/building-type.enum';
import { SpawnerBuildingDTO } from '../model/building.dto';

export interface BaseBuildingDTO extends SpawnerBuildingDTO {
    type: BuildingTypeEnum;
    name: string;
    
    resources: {
        matter: number;
        energy: number;
    }
}