import { GameLogicTimeFrameService } from "../../game-engine/sevices/game-logic-time-frame.service";
import { UnitsRepositoryService } from "../../units/services/units-repository.service";
import { WorkerUnitDTO } from "../../units/worker/worker-unit.dto";
import { GameLogicActionUnitHarvestDTO } from "../model/game-logic-action-unit-harvest.dto";
import { GameLogicActionDTO } from "../model/game-logic-action.dto";
import { GameLogicActionManagerInterface } from "./game-logic-action-manager.interface";
import { v4 as uuid } from 'uuid';
import { GameLogicActionOwnerTypeENUM } from "../model/game-logic-action-owner-type.enum";
import { GameLogicActionTypeENUM } from "../model/game-logic-action-type.enum";
import { GameLogicActionStatusENUM } from "../model/game-logic-action-status.enum";
import { WorkerUnitRoleENUM } from "../../units/worker/worker-unit-role.enum";
import { BuildingsRepositoryService } from "../../building/services/buildings-repository.service";
import { FarmBuildingManager } from "../../building/services/farm-building-manager.service";
import { FarmBuildingDTO } from "../../building/model/farm-building.dto";

export interface UnitHarvestActionManagerCreateActionsParams {
    unitId: string;
    buildingId: string;
}

export class UnitHarvestActionManager implements GameLogicActionManagerInterface {
    
    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly farmBuildingManager: FarmBuildingManager,
    ) {}

    createAction(params: UnitHarvestActionManagerCreateActionsParams): GameLogicActionDTO {

        const action: GameLogicActionUnitHarvestDTO = {
            id: uuid(),
            ownerId: params.unitId,
            ownerType: GameLogicActionOwnerTypeENUM.Unit,
            parentActionId: null,
            type: GameLogicActionTypeENUM.Harvest,
            status: GameLogicActionStatusENUM.Created,
            data: {
                started: 0,
                finished: 0,
                buildingId: params.buildingId,
            },
            activeAction: 0,
            subActionsIdList: []
        }

        return action;
    }

    initializeAction(action: GameLogicActionDTO): GameLogicActionDTO {

        const unit: WorkerUnitDTO = (this.unitsRepositoryService.findById(action.ownerId) as WorkerUnitDTO);
        
        let actionFinishIn = 0;
        if (unit.role === WorkerUnitRoleENUM.EnergyHarvester) {
            const cargoSpace = unit.maxCargo.energy - unit.currentCargo.energy;
            actionFinishIn = this.gameLogicTimeFrameService.getElapsedTime() + (cargoSpace / unit.harvestingSpeeds.energy);
        } else {
            const cargoSpace = unit.maxCargo.matter - unit.currentCargo.matter;
            actionFinishIn = this.gameLogicTimeFrameService.getElapsedTime() + (cargoSpace / unit.harvestingSpeeds.matter);
        }
        (action as GameLogicActionUnitHarvestDTO).data.started = this.gameLogicTimeFrameService.getElapsedTime();
        (action as GameLogicActionUnitHarvestDTO).data.finished = actionFinishIn;
        action.status = GameLogicActionStatusENUM.InProgress;

        unit.action = action;
        this.unitsRepositoryService.save(unit);

        return action;
    }

    processAction(genericAction: GameLogicActionDTO): GameLogicActionDTO {
        const unit: WorkerUnitDTO = (this.unitsRepositoryService.findById(genericAction.ownerId) as WorkerUnitDTO);
        const action: GameLogicActionUnitHarvestDTO = <GameLogicActionUnitHarvestDTO>genericAction;

        if (action.data.finished > this.gameLogicTimeFrameService.getElapsedTime()) {
            const timeElapsed = this.gameLogicTimeFrameService.getElapsedTime() - action.data.started;
            let cargoLoaded = 0;
            
            if (unit.role === WorkerUnitRoleENUM.EnergyHarvester) {
                cargoLoaded = timeElapsed * unit.harvestingSpeeds.energy;
                unit.currentCargo.energy = cargoLoaded;
            } else {
                cargoLoaded = timeElapsed * unit.harvestingSpeeds.matter;
                unit.currentCargo.matter = cargoLoaded;
            }

            this.unitsRepositoryService.save(unit);
        } else {
            action.status = GameLogicActionStatusENUM.Finished;
            if (unit.role === WorkerUnitRoleENUM.EnergyHarvester) {
                unit.currentCargo.energy = unit.maxCargo.energy;
            } else {
                unit.currentCargo.matter = unit.maxCargo.matter;
            }
            this.unitsRepositoryService.save(unit);
        }

        return action;
    }

    rewindAction(action: GameLogicActionDTO): GameLogicActionDTO {
        throw new Error("Method not implemented.");
    }

    subActionFinished(action: GameLogicActionDTO, subActionId: string): GameLogicActionDTO {
        throw new Error("Method not implemented.");
    }

    tearDownAction(action: GameLogicActionDTO): GameLogicActionDTO {
        const worker = <WorkerUnitDTO>this.unitsRepositoryService.findById(action.ownerId);
        const farm = <FarmBuildingDTO>this.buildingsRepositoryService.findById(action.data.buildingId);
        this.farmBuildingManager.freeFarmingSpot(worker, farm);
        return action;
    }

}