import { v4 as uuid } from 'uuid';
import { BaseBuildingDTO } from '../../building/base/base-building.dto';
import { BuildingsRepositoryService } from '../../building/services/buildings-repository.service';
import { BaseResourcesUpdateEvent } from '../../game-engine/events/base-resources-updated.event';
import { GameLogicActionUpdatedEvent } from '../../game-engine/events/game-logic-action-updated.event';
import { GameLogicTimeFrameService } from '../../game-engine/sevices/game-logic-time-frame.service';
import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { CoordinatesEntity } from '../../maps/model/coordinates.entity';
import { UnitsRepositoryService } from '../../units/services/units-repository.service';
import { WorkerUnitRoleENUM } from '../../units/worker/worker-unit-role.enum';
import { WorkerUnitDTO } from '../../units/worker/worker-unit.dto';
import { GameLogicActionOwnerTypeENUM } from '../model/game-logic-action-owner-type.enum';
import { GameLogicActionStatusENUM } from '../model/game-logic-action-status.enum';
import { GameLogicActionTypeENUM } from '../model/game-logic-action-type.enum';
import { GameLogicActionUnitDeliverDTO } from '../model/game-logic-action-unit-deliver.dto';
import { GameLogicActionDTO } from '../model/game-logic-action.dto';
import { GameLogicActionManagerInterface } from "./game-logic-action-manager.interface";

export interface UnitDeliverActionManagerCreateActionParams {
    ownerId: string;
    xCoordinate: number;
    yCoordinate: number;
}

export class UnitDeliverActionManager implements GameLogicActionManagerInterface {
    
    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly gameEventBusService: GameEventBusService,
    ) {}

    createAction(params: UnitDeliverActionManagerCreateActionParams): GameLogicActionDTO {
        const action: GameLogicActionUnitDeliverDTO = {
            id: uuid(),
            type: GameLogicActionTypeENUM.Deliver,
            ownerId: params.ownerId,
            ownerType: GameLogicActionOwnerTypeENUM.Unit,
            status: GameLogicActionStatusENUM.Created,
            data: {
                started: 0,
                finished: 0,
                coordinates: {
                    xCoordinate: params.xCoordinate,
                    yCoordinate: params.yCoordinate
                }
            },
            activeAction: 0,
            parentActionId: null,
            subActionsIdList: []
        }

        return action;
    }

    initializeAction(action: GameLogicActionDTO): GameLogicActionDTO {
        const unit: WorkerUnitDTO = (this.unitsRepositoryService.findById(action.ownerId) as WorkerUnitDTO);

        let actionFinishIn = 0;
        if (unit.role === WorkerUnitRoleENUM.EnergyHarvester) {
            actionFinishIn = this.gameLogicTimeFrameService.getElapsedTime() + (unit.currentCargo.energy / unit.deliveringSpeeds.energy);
        } else {
            actionFinishIn = this.gameLogicTimeFrameService.getElapsedTime() + (unit.currentCargo.matter / unit.deliveringSpeeds.matter);
        }
        (action as GameLogicActionUnitDeliverDTO).data.started = this.gameLogicTimeFrameService.getElapsedTime();
        (action as GameLogicActionUnitDeliverDTO).data.finished = actionFinishIn;
        action.status = GameLogicActionStatusENUM.InProgress;

        this.unitsRepositoryService.save(unit);

        const event: GameLogicActionUpdatedEvent = new GameLogicActionUpdatedEvent(action);
        this.gameEventBusService.cast(event);

        return action;
    }

    processAction(genericAction: GameLogicActionDTO): GameLogicActionDTO {
        const unit: WorkerUnitDTO = (this.unitsRepositoryService.findById(genericAction.ownerId) as WorkerUnitDTO);
        const action: GameLogicActionUnitDeliverDTO = <GameLogicActionUnitDeliverDTO>genericAction;

        if (action.data.finished < this.gameLogicTimeFrameService.getElapsedTime()) {
            const base: BaseBuildingDTO = (this.buildingsRepositoryService.findById(unit.baseId) as BaseBuildingDTO);
            base.resources.energy += unit.currentCargo.energy;
            base.resources.matter += unit.currentCargo.matter;

            unit.currentCargo.energy = 0;
            unit.currentCargo.matter = 0;

            this.unitsRepositoryService.save(unit);
            this.buildingsRepositoryService.save(base);

            action.status = GameLogicActionStatusENUM.Finished;

            const event: BaseResourcesUpdateEvent = new BaseResourcesUpdateEvent(<string>base.id, base.resources);
            this.gameEventBusService.cast(event);
        }

        return action;
    }

    rewindAction(action: GameLogicActionDTO): GameLogicActionDTO {
        throw new Error('Method not implemented.');
    }

    subActionFinished(action: GameLogicActionDTO, subActionId: string): GameLogicActionDTO {
        throw new Error("Method not implemented.");
    }

    tearDownAction(action: GameLogicActionDTO): GameLogicActionDTO {
        return action;
    }

}