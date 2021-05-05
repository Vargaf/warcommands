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
import { UnitHarvestActionManager } from "./unit-harvest-action-manager.service";
import { UnitMoveActionManager, UnitMoveActionManagerCreateActionsParams } from "./unit-move-action-manager.service";
import { FarmBuildingManager } from "../../building/services/farm-building-manager.service";
import { UnitDeliverActionManager } from "./unit-deliver-action-manager.service";
import { GameLogicActionRewindInitializer } from "../model/game-logic-action-rewind.dto";
import { GameLogicActionsRepositoryInterface } from "./game-logic-actions-repository.interface";
import { GameLogicActionMoveToDTO } from "../model/game-logic-action-move-to.dto";


export class UnitGoHarvestAndComeBackActionManager implements GameLogicActionManagerInterface {
    
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

                const moveToFarmAction = this.unitMoveActionManager.createAction(moveToFarmParams);
                const harvestAction = this.unitHarvestActionManager.createAction(worker);
                const moveToBaseAction = this.unitMoveActionManager.createAction(moveToBaseParams);
                const deliverAction = this.unitDeliverActionManager.createAction(worker);
                const rewindAction = GameLogicActionRewindInitializer.create(worker.id, GameLogicActionOwnerTypeENUM.Unit);

                moveToFarmAction.parentActionId = action.id;
                harvestAction.parentActionId = action.id;
                moveToBaseAction.parentActionId = action.id;
                deliverAction.parentActionId = action.id;
                rewindAction.parentActionId = action.id;

                this.gamelogicActionRepository.save(moveToFarmAction);
                this.gamelogicActionRepository.save(harvestAction);
                this.gamelogicActionRepository.save(moveToBaseAction);
                this.gamelogicActionRepository.save(deliverAction);
                this.gamelogicActionRepository.save(rewindAction);

                action.subActionsIdList = [
                    moveToFarmAction.id,
                    harvestAction.id,
                    moveToBaseAction.id,
                    deliverAction.id,
                    rewindAction.id
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

    tearDownAction(action: GameLogicActionDTO): GameLogicActionDTO {
        throw new Error("Method not implemented.");
    }
    
}