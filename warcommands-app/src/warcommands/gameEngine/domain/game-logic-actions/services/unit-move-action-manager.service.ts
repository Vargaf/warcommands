import { GameLogicActionDTO } from "../model/game-logic-action.dto";
import { v4 as uuid } from 'uuid';
import { GameLogicActionTypeENUM } from "../model/game-logic-action-type.enum";
import { GameLogicActionOwnerTypeENUM } from "../model/game-logic-action-owner-type.enum";
import { GameLogicActionStatusENUM } from "../model/game-logic-action-status.enum";
import { GameLogicActionMoveToDTO } from "../model/game-logic-action-move-to.dto";
import { PathFindingManagerService } from "../../maps/services/path-finding-manager.service";
import { CoordinatesEntity } from "../../maps/model/coordinates.entity";
import { UnitGenericDTO } from "../../units/model/unit-generic.dto";
import { UnitsRepositoryService } from "../../units/services/units-repository.service";
import { GameLogicTimeFrameService } from "../../game-engine/sevices/game-logic-time-frame.service";
import { MapBlockedTilesManagerService } from "../../maps/services/map-blocked-tiles-manager.service";
import { GameLogicActionUpdatedEvent } from "../../game-engine/events/game-logic-action-updated.event";
import { GameEventBusService } from "../../game-event-bus/services/game-event-bus.service";
import { GameLogicActionsRepositoryInterface } from "./game-logic-actions-repository.interface";
import { GameLogicActionManagerInterface } from "./game-logic-action-manager.interface";
import * as _ from 'lodash';

export interface UnitMoveActionManagerCreateActionsParams {
    ownerId: string;
    from: CoordinatesEntity;
    to: CoordinatesEntity;
}

export class UnitMoveActionManager implements GameLogicActionManagerInterface {

    constructor(
        private readonly pathFindingManager: PathFindingManagerService,
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly mapBlockedTilesManagerService: MapBlockedTilesManagerService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly gamelogicActionRepository: GameLogicActionsRepositoryInterface
    ) {}
    
    createAction(params: UnitMoveActionManagerCreateActionsParams): GameLogicActionDTO {
        let action: GameLogicActionMoveToDTO = {
            id: uuid(),
            ownerId: params.ownerId,
            ownerType: GameLogicActionOwnerTypeENUM.Unit,
            parentActionId: null,
	        type: GameLogicActionTypeENUM.MoveTo,
	        status: GameLogicActionStatusENUM.Created,
	        activeAction: 0,
            data: {
                from: {
                    xCoordinate: params.from.xCoordinate,
                    yCoordinate: params.from.yCoordinate
                },
                to: {
                    xCoordinate: params.to.xCoordinate,
                    yCoordinate: params.to.yCoordinate
                },
                path: [],
                currentPathStep: 0,
            }
        };

        return action;
    }

    processAction(action: GameLogicActionDTO): GameLogicActionDTO {
        const unit: UnitGenericDTO = this.unitsRepositoryService.findById(action.ownerId);

        let isUnitDirty = false;
        if (action.data.path.length) {
            const currentTileIndex = action.data.currentPathStep;
            const nextTileIndex = action.data.currentPathStep + 1;
            const nextTile = action.data.path[nextTileIndex];
            if (nextTile.time <= this.gameLogicTimeFrameService.getElapsedTime()) {
                this.mapBlockedTilesManagerService.freeTileByUnit(unit);
                action.data.currentPathStep++;
                unit.xCoordinate = action.data.path[currentTileIndex].xCoordinate;
                unit.yCoordinate = action.data.path[currentTileIndex].yCoordinate;
                this.mapBlockedTilesManagerService.blockTileFromUnit(unit);
                isUnitDirty = true;

                if(action.data.path.length - 1 === nextTileIndex) {
                    action.status = GameLogicActionStatusENUM.Finished;
                    action.data.currentPathStep++;
                    unit.xCoordinate = action.data.path[nextTileIndex].xCoordinate;
                    unit.yCoordinate = action.data.path[nextTileIndex].yCoordinate;
                    this.mapBlockedTilesManagerService.blockTileFromUnit(unit);
                    isUnitDirty = true;
                }
            }

            if (isUnitDirty) {
                this.unitsRepositoryService.save(unit);
            }
        }

        return action;
    }

    rewindAction(action: GameLogicActionDTO): GameLogicActionDTO {
        throw new Error("Method not implemented.");
    }

    tearDownAction(action: GameLogicActionDTO): GameLogicActionDTO {
        return action;
    }

    initializeAction(currentAction: GameLogicActionDTO): GameLogicActionDTO {

        currentAction.status = GameLogicActionStatusENUM.Initializing;

        const action: GameLogicActionMoveToDTO = <GameLogicActionMoveToDTO>_.clone(currentAction);

        this.pathFindingManager.findPath(action.data.from, action.data.to).then((path) => {
            action.data.path = path;
            action.data.currentPathStep = 0;
            this.initialize(<GameLogicActionMoveToDTO>action);
            this.gamelogicActionRepository.save(action);
        });
        
        return currentAction;
    }

    private initialize(action: GameLogicActionMoveToDTO): void {

        const unit: UnitGenericDTO = this.unitsRepositoryService.findById(action.ownerId);

        action = this.setTimesToPath(action, unit);
        action.status = GameLogicActionStatusENUM.InProgress;
        action.data.currentPathStep = 0;
        unit.action = action;

        this.mapBlockedTilesManagerService.freeTileByUnit(unit);
        const nextTileIndex = action.data.currentPathStep + 1;
        unit.xCoordinate = action.data.path[nextTileIndex].xCoordinate;
        unit.yCoordinate = action.data.path[nextTileIndex].yCoordinate;
        this.mapBlockedTilesManagerService.blockTileFromUnit(unit);

        this.unitsRepositoryService.save(unit);

        const event: GameLogicActionUpdatedEvent = new GameLogicActionUpdatedEvent(action);
        this.gameEventBusService.cast(event);
    }

    private setTimesToPath(action: GameLogicActionMoveToDTO, unit: UnitGenericDTO): GameLogicActionMoveToDTO {
        action.data.path.forEach((item, index) => {
            const timeToArrive = this.gameLogicTimeFrameService.getElapsedTime() + unit.attributes.speed * index;
            item.time = timeToArrive;
        });

        return action;
    }
}