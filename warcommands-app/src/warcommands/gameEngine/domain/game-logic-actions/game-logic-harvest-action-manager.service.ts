import { GameLogicActionManagerService } from './game-logic-action-manager.service';
import { UnitActionGenericDTO } from '../units/unit-actions/unit-action-generic.dto';
import { UnitsRepositoryService } from '../units/services/units-repository.service';
import { WorkerUnitDTO } from '../units/worker/worker-unit.dto';
import { UnitActionHarvestDTO } from '../units/unit-actions/unit-action-harvest.dto';
import { GameLogicTimeFrameService } from '../game-engine/sevices/game-logic-time-frame.service';
import { UnitActionStatusENUM } from '../units/unit-actions/unit-action-status.enum';
import { WorkerUnitRoleENUM } from '../units/worker/worker-unit-role.enum';

export class GameLogicHarvestActionManagerService implements GameLogicActionManagerService {
    
    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
    ) {}

    initializeAction(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO {
        const unit: WorkerUnitDTO = (this.unitsRepositoryService.findById(unitId) as WorkerUnitDTO);
        unit.currentCargo.matter = 0;
        unit.currentCargo.energy = 0;

        let actionFinishIn = 0;
        if (unit.role === WorkerUnitRoleENUM.EnergyHarvester) {
            const cargoSpace = unit.maxCargo.energy - unit.currentCargo.energy;
            actionFinishIn = this.gameLogicTimeFrameService.getCurrentTime() + (cargoSpace / unit.harvestingSpeeds.energy);
        } else {
            const cargoSpace = unit.maxCargo.matter - unit.currentCargo.matter;
            actionFinishIn = this.gameLogicTimeFrameService.getCurrentTime() + (cargoSpace / unit.harvestingSpeeds.matter);
        }
        (action as UnitActionHarvestDTO).data.started = this.gameLogicTimeFrameService.getCurrentTime();
        (action as UnitActionHarvestDTO).data.finished = actionFinishIn;
        action.actionStatus = UnitActionStatusENUM.InProgress;

        unit.action = action;
        this.unitsRepositoryService.save(unit);

        return action;
    }

    actionInProgress(genericAction: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO {
        const unit: WorkerUnitDTO = (this.unitsRepositoryService.findById(unitId) as WorkerUnitDTO);
        const action: UnitActionHarvestDTO = (genericAction as UnitActionHarvestDTO);
        if (action.data.finished > this.gameLogicTimeFrameService.getCurrentTime()) {
            const timeElapsed = this.gameLogicTimeFrameService.getCurrentTime() - action.data.started;
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
            action.actionStatus = UnitActionStatusENUM.Finished;
            if (unit.role === WorkerUnitRoleENUM.EnergyHarvester) {
                unit.currentCargo.energy = unit.maxCargo.energy;
            } else {
                unit.currentCargo.matter = unit.maxCargo.matter;
            }
            this.unitsRepositoryService.save(unit);
        }

        return action;
    }

}