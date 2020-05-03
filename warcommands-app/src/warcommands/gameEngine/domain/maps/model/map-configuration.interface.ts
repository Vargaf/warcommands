import { BaseBuildingDTO } from '../../building/base/base-building.dto';
import { MatterFarmBuildingDTO } from '../../building/matter-farm/matter-farm-building.dto';
import { EnergyFarmBuildingDTO } from '../../building/energy-farm/energy-farm-building.dto';

export interface MapConfiguration {
    tiles: number[][];
    size: {
        width: number,
        height: number
    };
    numberOfPlayers: number;
    initialBuildings: 
        {
            base: BaseBuildingDTO,
            matterFarm?: MatterFarmBuildingDTO,
            energyFarm?: EnergyFarmBuildingDTO,
        }[]
}
