import { BuildingTypeEnum } from '../model/building-type.enum';
import { BuildingDTO } from '../model/building.dto';
import { SpawnerDTO } from '../model/spawner.dto';

export interface BaseBuildingDTO extends BuildingDTO, SpawnerDTO {
    type: BuildingTypeEnum;
    name: string;
    
    resources: {
        matter: number;
        energy: number;
    }
}