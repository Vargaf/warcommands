import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { WorkerUnitRoleENUM } from '../../../units/worker/worker-unit-role.enum';
import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { UnitSuperAcionRepositopriService } from '../../../units/unit-actions/unit-super-action-repository.service';
import { UnitSuperActionDTO } from '../../../units/unit-actions/unit-super-action.dto';
import { UnitSuperActionStatusENUM } from '../../../units/unit-actions/unit-super-action-status.enum';
import { BuildingDTO } from '../../../building/model/building.dto';
import { BuildingTypeEnum } from '../../../building/model/building-type.enum';
import { FarmBuildingDTO } from '../../../building/model/farm-building.dto';
import { BuildingsRepositoryService } from '../../../building/services/buildings-repository.service';

export class WorkerSetRoleManagerService {

    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
    ) {}

    /*
    isRoleChangeAvailable(worker: WorkerUnitDTO, role: WorkerUnitRoleENUM): boolean {

        let isRoleChangeAvailable = true;

        const action: UnitSuperActionDTO = this.unitSuperActionRepositoryService.findByUnitId(worker.id);

        if (action) {
            if (action.status === UnitSuperActionStatusENUM.Finished) {
                if (this.isAHarvesterRole(role)) {
                    isRoleChangeAvailable = this.farmBuildingHasRoom(worker, role);
                } else {
                    throw new Error('Changing role to builder not implemented yet.');
                }
            } else {
                isRoleChangeAvailable = false;
            }
        }

        return isRoleChangeAvailable;
    }
    */

    changeRole(unit: WorkerUnitDTO, role: WorkerUnitRoleENUM): WorkerUnitDTO {
        /*
        const newFarm = this.getFarmBuildingWithFreeSpot(unit, role);
        let currentFarm = this.getCurrentWorkerFarmBuilding(unit);

        if (currentFarm) {
            currentFarm = this.removeWorkerFromUnitsFarmingList(currentFarm, unit);
            this.buildingsRepositoryService.save(currentFarm);
        }

        if (newFarm) {
            newFarm.unitsFarmingIdList.push(unit.id);
            this.buildingsRepositoryService.save(newFarm);
        }

        unit.action = null;
        unit.role = role;
        this.unitsRepositoryService.save(unit);

        const action: UnitSuperActionDTO = this.unitSuperActionRepositoryService.findByUnitId(unit.id);
        if (action) {
            this.unitSuperActionRepositoryService.remove(action);
        }
        */

        /*
        let currentFarm = this.getCurrentWorkerFarmBuilding(unit);

        if (currentFarm) {
            currentFarm = this.removeWorkerFromUnitsFarmingList(currentFarm, unit);
            this.buildingsRepositoryService.save(currentFarm);
        }
        */

        unit.action = null;
        unit.role = role;
        this.unitsRepositoryService.save(unit);

        const action: UnitSuperActionDTO = this.unitSuperActionRepositoryService.findByUnitId(unit.id);
        if (action) {
            this.unitSuperActionRepositoryService.remove(action);
        }

        console.log('Toca quitarlo de la granja donde este ahora, si es que esta en una, y eliminar la accion de cosecha');
        
        return unit;
    }

    /*
    private isAHarvesterRole(role: WorkerUnitRoleENUM): boolean {
        return role === WorkerUnitRoleENUM.MatterHarvester ||
            role === WorkerUnitRoleENUM.EnergyHarvester;
    }
    */

    /*
    private getFarmBuildingWithFreeSpot(worker: WorkerUnitDTO, role: WorkerUnitRoleENUM): FarmBuildingDTO {
        
        const farmBuildingList: FarmBuildingDTO[] = this.getPlayerFarmBuildings(worker.playerId, role);
        let farmBuildingWithFreeSpot!: FarmBuildingDTO;

        for (const building of farmBuildingList) {
            if (this.farmHasRoom((building as FarmBuildingDTO))) {
                farmBuildingWithFreeSpot = building;
                break;
            }
        }

        return farmBuildingWithFreeSpot;
    }
    */


    /*
    private getCurrentWorkerFarmBuilding(worker: WorkerUnitDTO): FarmBuildingDTO {
        
        const farmBuildingList: FarmBuildingDTO[] = this.getPlayerFarmBuildings(worker.playerId, <WorkerUnitRoleENUM>worker.role);
        let currentWorkerFarmBuilding!: FarmBuildingDTO;

        for (const building of farmBuildingList) {
            if (this.isWorkerOnFarm((building as FarmBuildingDTO), worker)) {
                currentWorkerFarmBuilding = building;
                break;
            }
        }

        return currentWorkerFarmBuilding;
    }
    */

    /*
    private getPlayerFarmBuildings(playerId: string, workerRole: WorkerUnitRoleENUM): FarmBuildingDTO[] {
        let buildingTypeToSearch!: BuildingTypeEnum;

        switch (workerRole) {
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

        return (farmBuildingList as FarmBuildingDTO[]);
    }
    */

    /*
    private isWorkerOnFarm(farm: FarmBuildingDTO, worker: WorkerUnitDTO): boolean {
        return farm.unitsFarming.has(worker.id);
    }
    */

    /*
    private farmBuildingHasRoom(worker: WorkerUnitDTO, role: WorkerUnitRoleENUM): boolean {
        let farmBuildingHasRoom = false;

        const farmBuildingList: FarmBuildingDTO[] = this.getPlayerFarmBuildings(worker.playerId, role);

        for (const building of farmBuildingList) {
            if (this.farmHasRoom((building as FarmBuildingDTO))) {
                farmBuildingHasRoom = true;
                break;
            }
        }

        return farmBuildingHasRoom;
    }
    */

    /*
    private farmHasRoom(farm: FarmBuildingDTO): boolean {
        return farm.maxUnitRoom > farm.unitsFarmingIdList.length;
    }
    */

    /*
    private removeWorkerFromUnitsFarmingList(farm: FarmBuildingDTO, worker: WorkerUnitDTO): FarmBuildingDTO {
        farm.unitsFarming.delete(worker.id);
        return farm;
    }
    */

}