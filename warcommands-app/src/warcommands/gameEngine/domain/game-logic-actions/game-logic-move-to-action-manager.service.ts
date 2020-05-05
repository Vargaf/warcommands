import { GameLogicActionManagerService } from './game-logic-action-manager.service';
import { UnitActionGenericDTO } from '../units/unit-actions/unit-action-generic.dto';
import { UnitsRepositoryService } from '../units/services/units-repository.service';
import { UnitGenericDTO } from '../units/model/unit-generic.dto';
import { UnitActionMoveToDTO } from '../units/unit-actions/unit-action-move-to.dto';
import { MapBlockedTilesManagerService } from '../maps/services/map-blocked-tiles-manager.service';
import { UnitActionStatusENUM } from '../units/unit-actions/unit-action-status.enum';
import { ActionUnitStartsToMoveEvent } from '../game-engine/events/action-unit-starts-to-move.event';
import { GameEventBusService } from '../game-event-bus/services/game-event-bus.service';
import { GameLogicTimeFrameService } from '../game-engine/sevices/game-logic-time-frame.service';

export class GameLogicMoveToActionManagerService implements GameLogicActionManagerService {
    
    constructor(
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly mapBlockedTilesManagerService: MapBlockedTilesManagerService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
    ) {}

    initializeAction(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO {
        const unit: UnitGenericDTO = this.unitsRepositoryService.findById(unitId);

        action = this.setTimesToPath((action as UnitActionMoveToDTO), unit);
        this.mapBlockedTilesManagerService.freeTileByUnit(unit);
        action.actionStatus = UnitActionStatusENUM.InProgress;
        action.data.currentPathStep = 0;
        unit.action = action;

        this.unitsRepositoryService.save(unit);

        const event: ActionUnitStartsToMoveEvent = new ActionUnitStartsToMoveEvent(unit);
        this.gameEventBusService.cast(event);
        
        return action;
    }

    actionInProgress(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO {
        const unit: UnitGenericDTO = this.unitsRepositoryService.findById(unitId);

        let isUnitDirty = false;
        if (action.data.path.length) {
            const currentTileIndex = action.data.currentPathStep;
            const nextTileIndex = action.data.currentPathStep + 1;
            const nextTile = action.data.path[nextTileIndex];
            if (nextTile.time <= this.gameLogicTimeFrameService.getCurrentTime()) {
                this.mapBlockedTilesManagerService.freeTileByUnit(unit);
                action.data.currentPathStep++;
                unit.xCoordinate = action.data.path[currentTileIndex].xCoordinate;
                unit.yCoordinate = action.data.path[currentTileIndex].yCoordinate;
                this.mapBlockedTilesManagerService.blockTilesFromUnit(unit);
                isUnitDirty = true;

                if(action.data.path.length - 1 === nextTileIndex) {
                    action.actionStatus = UnitActionStatusENUM.Finished;
                    isUnitDirty = true;
                }
            }

            if (isUnitDirty) {
                this.unitsRepositoryService.save(unit);
            }
        }

        return action;
    }

    private setTimesToPath(action: UnitActionMoveToDTO, unit: UnitGenericDTO): UnitActionMoveToDTO {
        action.data.path.forEach((item, index) => {
            const timeToArrive = this.gameLogicTimeFrameService.getCurrentTime() + unit.attributes.speed * index;
            item.time = timeToArrive;
        });

        return action;
    }

}