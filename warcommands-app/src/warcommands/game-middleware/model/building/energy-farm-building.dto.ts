import { BuildingDTO } from './building.dto';
import { BuildingTypeEnum } from './building-type.enum';

export interface EnergyFarmBuildingDTO extends BuildingDTO {
    type: BuildingTypeEnum.EnergyFarm;
}