import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { UnitTypeENUM } from '../../../units/model/unit-type.enum';
import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { UnitSuperAcionRepositopriService } from '../../../units/unit-actions/unit-super-action-repository.service';
import { WorkerUnitRoleENUM } from '../../../units/worker/worker-unit-role.enum';
import { FarmBuildingDTO } from '../../../building/model/farm-building.dto';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { BuildingsRepositoryService } from '../../../building/services/buildings-repository.service';
import { UnitSuperActionDTO } from '../../../units/unit-actions/unit-super-action.dto';
import { UnitSuperActionStatusENUM } from '../../../units/unit-actions/unit-super-action-status.enum';
import { WorkerHarvestActionManagerService } from './worker-harvest-action-manager.service';
import { WorkerDeliverActionManagerService } from './worker-deliver-action-manager.service';
import { UnitActionRewindDTO } from '../../../units/unit-actions/unit-action-rewind.dto';
import { UnitActionTypeENUM } from '../../../units/unit-actions/unit-action-type.enum';
import { UnitActionStatusENUM } from '../../../units/unit-actions/unit-action-status.enum';
import { WorkerMoveActionManagerService } from './worker-move-action-manager.service';
import { UnitActionGenericDTO } from '../../../units/unit-actions/unit-action-generic.dto';
import { BuildingDTO } from '../../../building/model/building.dto';
import { BuildingTypeEnum } from '../../../building/model/building-type.enum';
import { v4 as uuid } from 'uuid';

export class GameLogicInitializeWorkerActionsService {

    private readonly atomicActionsNumber = 5;

    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly workerHarvestActionManagerService: WorkerHarvestActionManagerService,
        private readonly workerDeliverActionManagerService: WorkerDeliverActionManagerService,
        private readonly workerMoveActionManager: WorkerMoveActionManagerService,
    ) {}

    initializeActions(): void {

       const workerList = this.unitsRepositoryService.findByType(UnitTypeENUM.Worker);

       for (const unit of workerList) {
           const worker: WorkerUnitDTO = (unit as WorkerUnitDTO);
            if (this.hasRole(worker)) {
                if (!this.hasSuperaction(worker)) {
                    this.createSuperAction(worker);
                }
            }
        }
    }

    private hasRole(worker: WorkerUnitDTO): boolean {
        return worker.role !== undefined;
    }

    private hasSuperaction(worker: WorkerUnitDTO): boolean {
        return this.unitSuperActionRepositoryService.unitHasSuperaction(worker.id);
    }

    private createSuperAction(worker: WorkerUnitDTO): void {
        if (this.hasHarvesterRole(worker)) {
            this.createHarvesterSuperAction(worker);
        }
    }

    private hasHarvesterRole(worker: WorkerUnitDTO): boolean {
        return worker.role === WorkerUnitRoleENUM.MatterHarvester || worker.role === WorkerUnitRoleENUM.EnergyHarvester;
    }

    private createHarvesterSuperAction(worker: WorkerUnitDTO): void {
        const farmBuilding: FarmBuildingDTO = (this.getFarmBuilding(worker) as FarmBuildingDTO);

        if (farmBuilding) {
            const base: BaseBuildingDTO = (this.buildingsRepositoryService.findById(worker.baseId) as BaseBuildingDTO);

            const harvestSuperAction: UnitSuperActionDTO = {
                unitId: worker.id,
                currentAtomicActionIndex: 0,
                atomicActions: [],
                status: UnitSuperActionStatusENUM.Initializing
            }
    
            const harvestAction = this.workerHarvestActionManagerService.harvest(worker);
            harvestSuperAction.atomicActions[1] = harvestAction;
            
            const deliverAction = this.workerDeliverActionManagerService.deliver(worker);
            harvestSuperAction.atomicActions[3] = deliverAction;

            const rewindSuperAction: UnitActionRewindDTO = {
                id: uuid(),
                type: UnitActionTypeENUM.RewindSuperAction,
                actionStatus: UnitActionStatusENUM.WaitingToStart,
                data: null
            }
            harvestSuperAction.atomicActions[4] = rewindSuperAction;
    
            this.unitSuperActionRepositoryService.save(harvestSuperAction);
    
            const xCoordinateBase = base.xCoordinate + base.spawnRelativeCoordinates.xCoordinate;
            const yCoordinateBase = base.yCoordinate + base.spawnRelativeCoordinates.yCoordinate;
            const xCoordinateFarm = farmBuilding.xCoordinate + farmBuilding.relativeEntranceCoordinates.xCoordinate;
            const yCoordinateFarm = farmBuilding.yCoordinate + farmBuilding.relativeEntranceCoordinates.yCoordinate;

            this.workerMoveActionManager.moveTo(xCoordinateBase, yCoordinateBase, xCoordinateFarm, yCoordinateFarm).subscribe((action) => {
                this.setMoveToFarmAtomicAction(worker.id, action);
            });
    
            this.workerMoveActionManager.moveTo(xCoordinateFarm, yCoordinateFarm, xCoordinateBase, yCoordinateBase).subscribe((action) => {
                this.setMoveToBaseAtomicAction(worker.id, action);
            });

            if (this.isSuperActionPreparedToStart(harvestSuperAction)) {
                harvestSuperAction.status = UnitSuperActionStatusENUM.PreparedToStart;
                this.unitSuperActionRepositoryService.save(harvestSuperAction);
            }
        }
    }

    private setMoveToFarmAtomicAction(unitId: string, atomicAction: UnitActionGenericDTO): void {
        const superAction: UnitSuperActionDTO = this.unitSuperActionRepositoryService.findByUnitId(unitId);
        superAction.atomicActions[0] = atomicAction;
        if (this.isSuperActionPreparedToStart(superAction)) {
            superAction.status = UnitSuperActionStatusENUM.PreparedToStart;
        }
        this.unitSuperActionRepositoryService.save(superAction);
    }
    
    private setMoveToBaseAtomicAction(unitId: string, atomicAction: UnitActionGenericDTO): void {
        const superAction: UnitSuperActionDTO = this.unitSuperActionRepositoryService.findByUnitId(unitId);
        superAction.atomicActions[2] = atomicAction;
        if (this.isSuperActionPreparedToStart(superAction)) {
            superAction.status = UnitSuperActionStatusENUM.PreparedToStart;
        }
        this.unitSuperActionRepositoryService.save(superAction);
    }

    private  isSuperActionPreparedToStart(superAction: UnitSuperActionDTO): boolean {

        let actionsWaitingToStart = 0;

        superAction.atomicActions.forEach((action) => {
            if (action !== undefined && action.actionStatus === UnitActionStatusENUM.WaitingToStart) {
                actionsWaitingToStart++;
            }
        });

        return actionsWaitingToStart === this.atomicActionsNumber;
    }

    private getFarmBuilding(worker: WorkerUnitDTO): BuildingDTO {
        let buildingTypeToSearch: BuildingTypeEnum;
        const playerId = worker.playerId;
        let farmBuildingToMove: BuildingDTO = null;

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
            if (this.farmHasRoom(building)) {
                farmBuildingToMove = building;
                break;
            }
        }

        return farmBuildingToMove;
    }

    private farmHasRoom(farm: BuildingDTO): boolean {
        return (farm as FarmBuildingDTO).maxUnitRoom > (farm as FarmBuildingDTO).unitsFarmingIdList.length;
    }

}