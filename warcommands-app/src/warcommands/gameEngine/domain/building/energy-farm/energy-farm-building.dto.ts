import { BuildingDTO } from '../model/building.dto';
import { BuildingTypeEnum } from '../model/building-type.enum';
import { FarmBuildingDTO } from '../model/farm-building.dto';

export interface EnergyFarmBuildingDTO extends BuildingDTO, FarmBuildingDTO {
    type: BuildingTypeEnum.EnergyFarm;
}