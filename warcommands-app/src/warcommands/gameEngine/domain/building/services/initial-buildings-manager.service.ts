import { MapConfiguration } from '../../maps/model/map-configuration.interface';
import { PlayerManagerService } from '../../player/services/player-manager.service';
import { PlayerDTO } from '../../player/model/player.dto';
import { BaseBuildingDTO } from '../base/base-building.dto';
import { BuildingsManagerService } from './buildings-manager.service';
import { v4 as uuid } from 'uuid';
import { MatterFarmBuildingDTO } from '../matter-farm/matter-farm-building.dto';
import { EnergyFarmBuildingDTO } from '../energy-farm/energy-farm-building.dto';
import { MatterFarmBuildingConfiguration } from '../matter-farm/matter-farm-building-configuration';
import { EnergyFarmBuildingConfiguration } from '../energy-farm/energy-farm-building-configurtion';

export class InitialBuildingsManagerService {

    constructor(
        private readonly playerManagerService: PlayerManagerService,
        private readonly buildingsManagerService: BuildingsManagerService,
    ) {}

    initializeFromMap(mapConfiguration: MapConfiguration): void {
        const randomizedInitialBuildingsIndexList: string[] = this.getRandomizedBaseIndexList(mapConfiguration);
        const playerList = this.playerManagerService.getPlayerList();
        const initialBuildingsList = mapConfiguration.initialBuildings;

        // tslint:disable-next-line: forin
        for (const index in randomizedInitialBuildingsIndexList) {
            const randomIndex = randomizedInitialBuildingsIndexList[index];
            
            const buildingList = initialBuildingsList[randomIndex];
            const player: PlayerDTO = playerList[index];

            const base: BaseBuildingDTO = this.buildBase(buildingList.base, player);

            if (buildingList.matterFarm) {
                this.buildMatterFarm(buildingList.matterFarm, player, base.id)
            }

            if (buildingList.energyFarm) {
                this.buildEnergyFarm(buildingList.energyFarm, player, base.id);
            }

        }
    }

    private getRandomizedBaseIndexList(map: MapConfiguration): string[] {
        const randomizedBaseIndexList: string[] = Object.keys(map.initialBuildings);
        return randomizedBaseIndexList.sort((a,b) => { return 0.5 - Math.random()});
    }

    private buildBase(rawBase: BaseBuildingDTO, player: PlayerDTO): BaseBuildingDTO {
        const base: BaseBuildingDTO = rawBase;
        base.id = base.baseId = uuid();
        base.playerId = player.id;
        this.buildingsManagerService.addBuilding(base);

        return base;
    }

    private buildMatterFarm(rawMatterFarm: MatterFarmBuildingDTO, player: PlayerDTO, baseId: string): void {
        const matterFarm: MatterFarmBuildingDTO = rawMatterFarm;
        matterFarm.id = uuid();
        matterFarm.baseId = baseId;
        matterFarm.playerId = player.id;
        matterFarm.maxUnitRoom = MatterFarmBuildingConfiguration.maxUnitRoom;
        this.buildingsManagerService.addBuilding(matterFarm);
    }

    private buildEnergyFarm(rawEnergyFarm: EnergyFarmBuildingDTO, player: PlayerDTO, baseId: string): void {
        const energyFarm: EnergyFarmBuildingDTO = rawEnergyFarm;
        energyFarm.id = uuid();
        energyFarm.baseId = baseId;
        energyFarm.playerId = player.id;
        energyFarm.maxUnitRoom = EnergyFarmBuildingConfiguration.maxUnitRoom;
        this.buildingsManagerService.addBuilding(energyFarm);
    }
}