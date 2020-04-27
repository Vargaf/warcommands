import { BuildingDTO } from '../model/building.dto';
import { BuildingTypeEnum } from '../model/building-type.enum';

export interface MatterFarmBuildingDTO extends BuildingDTO {
    type: BuildingTypeEnum.MatterFarm;
}