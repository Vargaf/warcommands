import { UnitGenericDTO } from '../../../units/model/unit-generic.dto';
import { GameLogicTimeFrameService } from '../game-logic-time-frame.service';
import { UnitActionMoveToDTO } from '../../../units/unit-actions/unit-action-move-to.dto';
import { UnitActionStatusENUM } from '../../../units/unit-actions/unit-action-status.enum';
import { UnitsRepositoryService } from '../../../units/services/units-repository.service';
import { MapBlockedTilesManagerService } from '../../../maps/services/map-blocked-tiles-manager.service';

export class MoveToActionManagerService {

    constructor(
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly mapBlockedTilesManagerService: MapBlockedTilesManagerService,
    ) {}

    moveUnit(unit: UnitGenericDTO): void {
        const action: UnitActionMoveToDTO = (unit.action as UnitActionMoveToDTO);
        let isWorkerDirty = false;
        if (action.data.path.length) {
            const nextTile = action.data.path[1];
            if (nextTile.time <= this.gameLogicTimeFrameService.getCurrentTime()) {
                this.mapBlockedTilesManagerService.freeTileByUnit(unit);
                action.data.path.splice(0, 1);
                unit.xCoordinate = action.data.path[0].xCoordinate;
                unit.yCoordinate = action.data.path[0].yCoordinate;
                this.mapBlockedTilesManagerService.blockTilesFromUnit(unit);
                isWorkerDirty = true;
            }

            if(action.data.path.length === 1) {
                action.actionStatus = UnitActionStatusENUM.Finished;
                action.data.path = [];
                isWorkerDirty = true;
            }

            if (isWorkerDirty) {
                this.unitsRepositoryService.save(unit);
            }
        }
    }

}