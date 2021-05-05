import { CoordinatesEntity } from "../../maps/model/coordinates.entity";
import { tileAroundOrder } from "../../share/tile-around-order";
import { WorkerUnitRoleENUM } from "../../units/worker/worker-unit-role.enum";
import { WorkerUnitDTO } from "../../units/worker/worker-unit.dto";
import { BuildingTypeEnum } from "../model/building-type.enum";
import { BuildingDTO } from "../model/building.dto";
import { FarmBuildingDTO } from "../model/farm-building.dto";
import { BuildingsRepositoryService } from "./buildings-repository.service";

export class FarmBuildingManager {
 
    constructor(
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
    ) {}

    findFarmWithFreeSpotToHarvest(worker: WorkerUnitDTO): FarmBuildingDTO | null {
        let buildingTypeToSearch!: BuildingTypeEnum;
        const playerId = worker.playerId;
        let farmBuilding!: FarmBuildingDTO;

        switch (worker.role) {
            case WorkerUnitRoleENUM.EnergyHarvester: {
                buildingTypeToSearch = BuildingTypeEnum.EnergyFarm;
                break;
            }
            case WorkerUnitRoleENUM.MatterHarvester: {
                buildingTypeToSearch = BuildingTypeEnum.MatterFarm;
                break;
            }
        }

        const farmBuildingList: BuildingDTO[] = this.buildingsRepositoryService.findByTypePlayer(buildingTypeToSearch, playerId);

        for (const building of farmBuildingList) {
            if (this.farmHasRoom((building as FarmBuildingDTO), worker)) {
                farmBuilding = <FarmBuildingDTO>building;
                break;
            }
        }

        return farmBuilding;
    }

    addWorkerToUnitsFarmingList(farm: FarmBuildingDTO, worker: WorkerUnitDTO): FarmBuildingDTO {

        let isUnitAlreadyFarming = farm.unitsFarming.has(worker.id);

        if (!isUnitAlreadyFarming) {
            const farmingCoordinates = this.getFarmFreeSpot(farm);
            farm.unitsFarming.set(worker.id, farmingCoordinates);
            this.buildingsRepositoryService.save(farm);
            isUnitAlreadyFarming = true;
        }

        if(!isUnitAlreadyFarming) {
            throw new Error('The unit can not be added to the farming list');
        }

        return farm;
    }

    freeFarmingSpot(worker: WorkerUnitDTO, farm: FarmBuildingDTO): FarmBuildingDTO {
        const isWorkerFarming = farm.unitsFarming.has(worker.id); 

        if (isWorkerFarming) {
            farm.unitsFarming.delete(worker.id);
        }

        this.buildingsRepositoryService.save(farm);

        return farm;
    }

    private getFarmFreeSpot(farm: FarmBuildingDTO): CoordinatesEntity {

        // The tiles around the farm
        const farmingSpotList = tileAroundOrder;

        let farmingCoordinates!: CoordinatesEntity;
        
        for(let farmingSpotIndex in farmingSpotList) {
            let isFreeSpotIndex = true;
            const xCoordinateToCheck = farm.xCoordinate + farmingSpotList[farmingSpotIndex][0];
            const yCoordinateToCheck = farm.yCoordinate + farmingSpotList[farmingSpotIndex][1];
            
            for(let unitCoordinates of farm.unitsFarming.values()) {
                if(unitCoordinates.xCoordinate === xCoordinateToCheck && unitCoordinates.yCoordinate === yCoordinateToCheck) {
                    isFreeSpotIndex = false;
                }
            }

            if(isFreeSpotIndex) {
                farmingCoordinates = {
                    xCoordinate: xCoordinateToCheck,
                    yCoordinate: yCoordinateToCheck
                };
                break;
            }
        }

        return farmingCoordinates;
    }

    private farmHasRoom(farm: FarmBuildingDTO, worker: WorkerUnitDTO): boolean {
        let farmHasRoom = false;

        farmHasRoom = farm.unitsFarming.has(worker.id); 

        if (!farmHasRoom) {
            farmHasRoom = farm.maxUnitRoom > farm.unitsFarming.size;
        }

        return farmHasRoom;
    }

}