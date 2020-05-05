import { GameLogicActionManagerService } from './game-logic-action-manager.service';
import { UnitsRepositoryService } from '../units/services/units-repository.service';
import { GameLogicTimeFrameService } from '../game-engine/sevices/game-logic-time-frame.service';
import { UnitActionGenericDTO } from '../units/unit-actions/unit-action-generic.dto';
import { WorkerUnitDTO } from '../units/worker/worker-unit.dto';
import { WorkerUnitRoleENUM } from '../units/worker/worker-unit-role.enum';
import { UnitActionDeliverDTO } from '../units/unit-actions/unit-action-deliver.dto';
import { UnitActionStatusENUM } from '../units/unit-actions/unit-action-status.enum';
import { BuildingsRepositoryService } from '../building/services/buildings-repository.service';
import { BaseBuildingDTO } from '../building/base/base-building.dto';
import { BaseResourcesUpdateEvent } from '../game-engine/events/base-resources-updated.event';
import { GameEventBusService } from '../game-event-bus/services/game-event-bus.service';
import { v4 as uuid } from 'uuid';
import { UnitActionTypeENUM } from '../units/unit-actions/unit-action-type.enum';

export class GameLogicDeliverActionManagerService implements GameLogicActionManagerService {
    
    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly gameEventBusService: GameEventBusService,
    ) {}

    createAction(): UnitActionGenericDTO {
        const action: UnitActionDeliverDTO = {
            id: uuid(),
            type: UnitActionTypeENUM.Deliver,
            actionStatus: UnitActionStatusENUM.WaitingToStart,
            data: {
                started: 0,
                finished: 0
            }
        }

        return action;
    }

    initializeAction(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO {
        const unit: WorkerUnitDTO = (this.unitsRepositoryService.findById(unitId) as WorkerUnitDTO);

        let actionFinishIn = 0;
        if (unit.role === WorkerUnitRoleENUM.EnergyHarvester) {
            actionFinishIn = this.gameLogicTimeFrameService.getCurrentTime() + (unit.currentCargo.energy / unit.deliveringSpeeds.energy);
        } else {
            actionFinishIn = this.gameLogicTimeFrameService.getCurrentTime() + (unit.currentCargo.matter / unit.deliveringSpeeds.matter);
        }
        (action as UnitActionDeliverDTO).data.started = this.gameLogicTimeFrameService.getCurrentTime();
        (action as UnitActionDeliverDTO).data.finished = actionFinishIn;
        action.actionStatus = UnitActionStatusENUM.InProgress;

        unit.action = action;
        this.unitsRepositoryService.save(unit);

        return action;
    }

    actionInProgress(genericAction: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO {
        const unit: WorkerUnitDTO = (this.unitsRepositoryService.findById(unitId) as WorkerUnitDTO);
        const action: UnitActionDeliverDTO = (genericAction as UnitActionDeliverDTO);

        if (action.data.finished < this.gameLogicTimeFrameService.getCurrentTime()) {
            const base: BaseBuildingDTO = (this.buildingsRepositoryService.findById(unit.baseId) as BaseBuildingDTO);
            base.resources.energy += unit.currentCargo.energy;
            base.resources.matter += unit.currentCargo.matter;

            unit.currentCargo.energy = 0;
            unit.currentCargo.matter = 0;

            this.unitsRepositoryService.save(unit);
            this.buildingsRepositoryService.save(base);

            action.actionStatus = UnitActionStatusENUM.Finished;

            const event: BaseResourcesUpdateEvent = new BaseResourcesUpdateEvent(base.id, base.resources);
            this.gameEventBusService.cast(event);
        }

        return action;
    }

}