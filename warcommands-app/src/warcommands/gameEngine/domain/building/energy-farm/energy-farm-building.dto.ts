import { BuildingDTO } from '../model/building.dto';
import { BuildingTypeEnum } from '../model/building-type.enum';

export interface EnergyFarmBuildingDTO extends BuildingDTO {
    type: BuildingTypeEnum.EnergyFarm;
}