import { WorkerUnitDTO } from '../../../units/worker/worker-unit.dto';
import { UnitSuperAcionRepositopriService } from '../../../units/unit-actions/unit-super-action-repository.service';
import { WorkerUnitRoleENUM } from '../../../units/worker/worker-unit-role.enum';
import { FarmBuildingDTO } from '../../../building/model/farm-building.dto';
import { BaseBuildingDTO } from '../../../building/base/base-building.dto';
import { BuildingsRepositoryService } from '../../../building/services/buildings-repository.service';
import { UnitSuperActionDTO } from '../../../units/unit-actions/unit-super-action.dto';
import { UnitSuperActionStatusENUM } from '../../../units/unit-actions/unit-super-action-status.enum';
import { UnitActionRewindDTO } from '../../../units/unit-actions/unit-action-rewind.dto';
import { UnitActionTypeENUM } from '../../../units/unit-actions/unit-action-type.enum';
import { UnitActionStatusENUM } from '../../../units/unit-actions/unit-action-status.enum';
import { UnitActionGenericDTO } from '../../../units/unit-actions/unit-action-generic.dto';
import { BuildingDTO } from '../../../building/model/building.dto';
import { BuildingTypeEnum } from '../../../building/model/building-type.enum';
import { v4 as uuid } from 'uuid';
import { GameLogicHarvestActionManagerService } from '../../../game-logic-actions/game-logic-harvest-action-manager.service';
import { GameLogicDeliverActionManagerService } from '../../../game-logic-actions/game-logic-deliver-action-manager.service';
import { GameLogicMoveToActionManagerService } from '../../../game-logic-actions/game-logic-move-to-action-manager.service';

export class GameLogicInitializeWorkerHarvestActionsService {

    constructor(
        private readonly unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly gameLogicHarvestActionManager: GameLogicHarvestActionManagerService,
        private readonly gameLogicDeliverActionManager: GameLogicDeliverActionManagerService,
        private readonly gameLogicMoveToActionManager: GameLogicMoveToActionManagerService
    ) {}

    createHarvesterSuperAction(worker: WorkerUnitDTO): void {
        let farmBuilding: FarmBuildingDTO = (this.getFarmBuilding(worker) as FarmBuildingDTO);

        if (farmBuilding) {

            farmBuilding = this.addWorkerToUnitsFarmingList(farmBuilding, worker);
            
            const base: BaseBuildingDTO = (this.buildingsRepositoryService.findById(worker.baseId) as BaseBuildingDTO);

            const harvestSuperAction: UnitSuperActionDTO = {
                unitId: worker.id,
                currentAtomicActionIndex: 0,
                atomicActions: [],
                status: UnitSuperActionStatusENUM.Initializing
            }
    
            const harvestAction = this.gameLogicHarvestActionManager.createAction()
            harvestSuperAction.atomicActions[0] = null;
            harvestSuperAction.atomicActions[1] = harvestAction;
            harvestSuperAction.atomicActions[2] = null;
            
            const deliverAction = this.gameLogicDeliverActionManager.createAction();
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

            this.gameLogicMoveToActionManager.createAction(xCoordinateBase, yCoordinateBase, xCoordinateFarm, yCoordinateFarm).subscribe((action) => {
                this.setMoveToFarmAtomicAction(worker.id, action);
            });
    
            this.gameLogicMoveToActionManager.createAction(xCoordinateFarm, yCoordinateFarm, xCoordinateBase, yCoordinateBase).subscribe((action) => {
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

        let areAllActionsPreparedToStart = true;

        /*
        superAction.atomicActions.forEach((action) => {
            if (!action || action.actionStatus !== UnitActionStatusENUM.WaitingToStart) {
                areAllActionsPreparedToStart = false;
            }
        });
        */
       for (let actionIndex = 0; actionIndex < superAction.atomicActions.length; actionIndex++) {
           const action = superAction.atomicActions[actionIndex];

            if (!action || action.actionStatus !== UnitActionStatusENUM.WaitingToStart) {
                areAllActionsPreparedToStart = false;
            }
       }

        return areAllActionsPreparedToStart;
    }

    private getFarmBuilding(worker: WorkerUnitDTO): BuildingDTO {
        let buildingTypeToSearch!: BuildingTypeEnum;
        const playerId = worker.playerId;
        let farmBuildingToMove!: BuildingDTO;

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
                farmBuildingToMove = building;
                break;
            }
        }

        return farmBuildingToMove;
    }

    private farmHasRoom(farm: FarmBuildingDTO, worker: WorkerUnitDTO): boolean {
        let farmHasRoom = false;

        farmHasRoom = farm.unitsFarmingIdList.some((workerId) => workerId === worker.id);

        if (!farmHasRoom) {
            farmHasRoom = farm.maxUnitRoom > farm.unitsFarmingIdList.length;
        }

        return farmHasRoom;
    }

    private addWorkerToUnitsFarmingList(farm: FarmBuildingDTO, worker: WorkerUnitDTO): FarmBuildingDTO {

        const isSpotBooked = farm.unitsFarmingIdList.some((workerId) => workerId === worker.id);

        if (!isSpotBooked) {
            farm.unitsFarmingIdList.push(worker.id);
            this.buildingsRepositoryService.save(farm);
        }

        return farm;
    }

}