import { GameLogicActionDTO } from "../model/game-logic-action.dto";
import { GameLogicActionManagerInterface } from "./game-logic-action-manager.interface";
import { v4 as uuid } from 'uuid';
import { GameLogicActionOwnerTypeENUM } from "../model/game-logic-action-owner-type.enum";
import { GameLogicActionUnitGoHarvestAndComeBackDTO } from "../model/game-logic-action-unit-go-harvest-and-come-back.dto";
import { GameLogicActionTypeENUM } from "../model/game-logic-action-type.enum";
import { GameLogicActionStatusENUM } from "../model/game-logic-action-status.enum";
import { FarmBuildingDTO } from "../../building/model/farm-building.dto";
import { WorkerUnitDTO } from "../../units/worker/worker-unit.dto";
import { BuildingsRepositoryService } from "../../building/services/buildings-repository.service";
import { BaseBuildingDTO } from "../../building/base/base-building.dto";
import { UnitsRepositoryService } from "../../units/services/units-repository.service";
import { UnitHarvestActionManager, UnitHarvestActionManagerCreateActionsParams } from "./unit-harvest-action-manager.service";
import { UnitMoveActionManager, UnitMoveActionManagerCreateActionsParams } from "./unit-move-action-manager.service";
import { FarmBuildingManager } from "../../building/services/farm-building-manager.service";
import { UnitDeliverActionManager } from "./unit-deliver-action-manager.service";
import { GameLogicActionRewindInitializer } from "../model/game-logic-action-rewind.dto";
import { GameLogicActionsRepositoryInterface } from "./game-logic-actions-repository.interface";
import { GameLogicActionMoveToDTO } from "../model/game-logic-action-move-to.dto";
import { GameLogicActionUnitHarvestDTO } from "../model/game-logic-action-unit-harvest.dto";


export class UnitGoHarvestAndComeBackActionManager implements GameLogicActionManagerInterface {
    
    private harvestSubActionIndex = 1;

    constructor(
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly unitHarvestActionManager: UnitHarvestActionManager,
        private readonly unitMoveActionManager: UnitMoveActionManager,
        private readonly farmBuildingManager: FarmBuildingManager,
        private readonly unitDeliverActionManager: UnitDeliverActionManager,
        private readonly gamelogicActionRepository: GameLogicActionsRepositoryInterface,
    ) {}
    
    createAction(worker: WorkerUnitDTO): GameLogicActionDTO {

        const action: GameLogicActionUnitGoHarvestAndComeBackDTO = {
            id: uuid(),
            ownerId: worker.id,
            ownerType: GameLogicActionOwnerTypeENUM.Unit,
            parentActionId: null,
            type: GameLogicActionTypeENUM.UnitGoHarvestAndComeBack,
            status: GameLogicActionStatusENUM.Created,
            activeAction: 0,
            data: null,
            subActionsIdList: []
        };

        return action;
    }

    initializeAction(action: GameLogicActionDTO): GameLogicActionDTO {
        const worker: WorkerUnitDTO = <WorkerUnitDTO>this.unitsRepositoryService.findById(action.ownerId);
        let farmBuilding: FarmBuildingDTO | null = this.farmBuildingManager.findFarmWithFreeSpotToHarvest(worker);

        if (farmBuilding) {

            try {
                const base: BaseBuildingDTO = (this.buildingsRepositoryService.findById(worker.baseId) as BaseBuildingDTO);
                farmBuilding = this.farmBuildingManager.addWorkerToUnitsFarmingList(farmBuilding, worker);

                action.status = GameLogicActionStatusENUM.InProgress;

                const farmingCoordinates = farmBuilding.unitsFarming.get(worker.id);

                const moveToFarmParams: UnitMoveActionManagerCreateActionsParams = {
                    ownerId: action.ownerId,
                    from: {
                        xCoordinate: worker.xCoordinate,
                        yCoordinate: worker.yCoordinate
                    },
                    to: {
                        xCoordinate: <number>farmingCoordinates?.xCoordinate,
                        yCoordinate: <number>farmingCoordinates?.yCoordinate
                    },
                    checkIfEndPathIsOccupied: false,
                }

                const moveToBaseParams: UnitMoveActionManagerCreateActionsParams = {
                    ownerId: action.ownerId,
                    from: {
                        xCoordinate: <number>farmingCoordinates?.xCoordinate,
                        yCoordinate: <number>farmingCoordinates?.yCoordinate
                    },
                    to: {
                        xCoordinate: base.xCoordinate + base.spawnRelativeCoordinates.xCoordinate,
                        yCoordinate: base.yCoordinate + base.spawnRelativeCoordinates.yCoordinate
                    },
                    checkIfEndPathIsOccupied: false,
                }

                const unitHarvestActionManagerCreateActionsParams: UnitHarvestActionManagerCreateActionsParams = {
                    unitId: worker.id,
                    buildingId: <string>farmBuilding.id,
                };

                const moveToFarmAction = this.unitMoveActionManager.createAction(moveToFarmParams);
                const harvestAction = this.unitHarvestActionManager.createAction(unitHarvestActionManagerCreateActionsParams);
                const moveToBaseAction = this.unitMoveActionManager.createAction(moveToBaseParams);
                const deliverAction = this.unitDeliverActionManager.createAction(worker);
                //const rewindAction = GameLogicActionRewindInitializer.create(worker.id, GameLogicActionOwnerTypeENUM.Unit);

                moveToFarmAction.parentActionId = action.id;
                harvestAction.parentActionId = action.id;
                moveToBaseAction.parentActionId = action.id;
                deliverAction.parentActionId = action.id;
                //rewindAction.parentActionId = action.id;

                this.gamelogicActionRepository.save(moveToFarmAction);
                this.gamelogicActionRepository.save(harvestAction);
                this.gamelogicActionRepository.save(moveToBaseAction);
                this.gamelogicActionRepository.save(deliverAction);
                
                action.subActionsIdList = [
                    moveToFarmAction.id,
                    harvestAction.id,
                    moveToBaseAction.id,
                    deliverAction.id,
                ];


            } catch(error) {
                action.status = GameLogicActionStatusENUM.Finished;   
            }
        
        } else {
            action.status = GameLogicActionStatusENUM.Finished;
        }

        return action;
    }
    
    processAction(action: GameLogicActionDTO): GameLogicActionDTO {

        // Once all the sub actions have finished this action is also finished
        let shouldActionFinish = true;
        for(let subactionId of action.subActionsIdList) {
            const subAction = this.gamelogicActionRepository.findById(subactionId);
            if(subAction.status !== GameLogicActionStatusENUM.Finished) {
                shouldActionFinish = false;
                break;
            }
        }

        if(shouldActionFinish) {
            action.status = GameLogicActionStatusENUM.Finished;
        }

        return action;
    }

    rewindAction(action: GameLogicActionDTO): GameLogicActionDTO {
        if(action.subActionsIdList) {
            let harvestAction = this.gamelogicActionRepository.findById(action.subActionsIdList[1]);
            harvestAction.status = GameLogicActionStatusENUM.Created;
            this.gamelogicActionRepository.save(harvestAction);
            
            let moveToBaseAction = <GameLogicActionMoveToDTO>this.gamelogicActionRepository.findById(action.subActionsIdList[2]);
            moveToBaseAction.status = GameLogicActionStatusENUM.Created;
            this.gamelogicActionRepository.save(moveToBaseAction);

            let deliverAction = this.gamelogicActionRepository.findById(action.subActionsIdList[3]);
            deliverAction.status = GameLogicActionStatusENUM.Created;
            this.gamelogicActionRepository.save(deliverAction);

            let moveToFarmAction = <GameLogicActionMoveToDTO>this.gamelogicActionRepository.findById(action.subActionsIdList[0]);
            moveToFarmAction.status = GameLogicActionStatusENUM.Created;
            moveToFarmAction.data.from.xCoordinate = moveToBaseAction.data.to.xCoordinate;
            moveToFarmAction.data.from.yCoordinate = moveToBaseAction.data.to.yCoordinate;
            this.gamelogicActionRepository.save(moveToFarmAction);
        }
        return action;
    }

    subActionFinished(action: GameLogicActionDTO, subActionId: string): GameLogicActionDTO {
        
        const harvestingActionId = action.subActionsIdList[this.harvestSubActionIndex];
        if(harvestingActionId === subActionId) {
            // The unit has finished to harvest, so we should free the harvesting spot on the farm to another unit
            const harvestingAction = <GameLogicActionUnitHarvestDTO>this.gamelogicActionRepository.findById(subActionId);
            this.unitHarvestActionManager.tearDownAction(harvestingAction);
        }

        return action;
    }

    tearDownAction(action: GameLogicActionDTO): GameLogicActionDTO {

        // We have to take into account that the action is finished because there was no free spot to farm
        if(action.subActionsIdList.length > 0) {
            const moveToFarmAction = this.gamelogicActionRepository.findById(action.subActionsIdList[0]);
            const harvestAction = this.gamelogicActionRepository.findById(action.subActionsIdList[1]);
            const moveToBaseAction = this.gamelogicActionRepository.findById(action.subActionsIdList[2]);
            const deliverAction = this.gamelogicActionRepository.findById(action.subActionsIdList[3]);

            this.unitMoveActionManager.tearDownAction(moveToFarmAction);
            this.unitHarvestActionManager.tearDownAction(harvestAction);
            this.unitMoveActionManager.tearDownAction(moveToBaseAction);
            this.unitDeliverActionManager.tearDownAction(deliverAction);

            this.gamelogicActionRepository.remove(moveToFarmAction);
            this.gamelogicActionRepository.remove(harvestAction);
            this.gamelogicActionRepository.remove(moveToBaseAction);
            this.gamelogicActionRepository.remove(deliverAction);
        }
        
        return action;
    }
    
}