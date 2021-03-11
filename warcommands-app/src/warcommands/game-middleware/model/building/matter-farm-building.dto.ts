import { BuildingDTO } from './building.dto';
import { BuildingTypeEnum } from './building-type.enum';

export interface MatterFarmBuildingDTO extends BuildingDTO {
    type: BuildingTypeEnum.MatterFarm;
}