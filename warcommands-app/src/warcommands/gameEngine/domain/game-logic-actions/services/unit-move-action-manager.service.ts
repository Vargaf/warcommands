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
import { PathFindingCoordinate } from "../../maps/model/path-finding-coordinate.dto";

export interface UnitMoveActionManagerCreateActionsParams {
    ownerId: string;
    from: CoordinatesEntity;
    to: CoordinatesEntity;
    checkIfEndPathIsOccupied: boolean;
}

export class UnitMoveActionManager implements GameLogicActionManagerInterface {

    constructor(
        private readonly pathFindingManager: PathFindingManagerService,
        private readonly unitsRepositoryService: UnitsRepositoryService,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly mapBlockedTilesManagerService: MapBlockedTilesManagerService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly gamelogicActionRepository: GameLogicActionsRepositoryInterface,

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
                checkIfEndPathIsOccupied: params.checkIfEndPathIsOccupied,
            },
            subActionsIdList: []
        };

        return action;
    }

    initializeAction(currentAction: GameLogicActionDTO): GameLogicActionDTO {

        currentAction.status = GameLogicActionStatusENUM.Initializing;

        const action: GameLogicActionMoveToDTO = <GameLogicActionMoveToDTO>_.clone(currentAction);

        this.pathFindingManager.findPath(action.data.from, action.data.to).then((path) => {

            if(this.isARaceToFindTheNextFreeTile(action, path)) {
                const unit = this.unitsRepositoryService.findById(action.ownerId);
                this.updateTheActionToTheNearestFreeTile(unit, action);
            } else {
                action.data.path = path;
                this.initialize(<GameLogicActionMoveToDTO>action);
                this.gamelogicActionRepository.save(action);
            }
            
        });
        
        return currentAction;
    }

    processAction(genericAction: GameLogicActionDTO): GameLogicActionDTO {
        let action: GameLogicActionMoveToDTO = <GameLogicActionMoveToDTO>genericAction;

        if(!this.hasUnitArrivedToTheEnd(action)) {

            const unit: UnitGenericDTO = this.unitsRepositoryService.findById(action.ownerId);

            const nextTileIndex = action.data.currentPathStep + 1;
            const nextTile = action.data.path[nextTileIndex];
            let unitHasMoved = false;

            if (nextTile.time <= this.gameLogicTimeFrameService.getElapsedTime()) {
                this.mapBlockedTilesManagerService.freeTileByUnit(unit);
                action.data.currentPathStep++;
                unit.xCoordinate = action.data.path[nextTileIndex].xCoordinate;
                unit.yCoordinate = action.data.path[nextTileIndex].yCoordinate;
                this.mapBlockedTilesManagerService.blockTileFromUnit(unit);
                unitHasMoved = true;

                if(this.hasUnitArrivedToTheEnd(action)) {
                    if(action.data.checkIfEndPathIsOccupied && this.isTheTileOccupiedByOtherUnit(unit)) {
                        action = this.updateTheActionToTheNearestFreeTile(unit, action);
                    } else {
                        action.status = GameLogicActionStatusENUM.Finished;
                    }
                }
            }

            if (unitHasMoved) {
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

    subActionFinished(action: GameLogicActionDTO, subActionId: string): GameLogicActionDTO {
        throw new Error("Method not implemented.");
    }


    private updateTheActionToTheNearestFreeTile(unit: UnitGenericDTO, action: GameLogicActionMoveToDTO): GameLogicActionMoveToDTO {
        const nearestFreeTile = this.findNearestFreeTile(unit);
        action.data.from.xCoordinate = unit.xCoordinate;
        action.data.from.yCoordinate = unit.yCoordinate;
        action.data.to.xCoordinate = nearestFreeTile.xCoordinate;
        action.data.to.yCoordinate = nearestFreeTile.yCoordinate;
        action.data.path = [];
        action.data.currentPathStep = 0;

        return <GameLogicActionMoveToDTO>this.initializeAction(action);
    }

    private isTheTileOccupiedByOtherUnit(unit: UnitGenericDTO): boolean {
        return this.mapBlockedTilesManagerService.isTileOccupiedByAnotherUnit(unit);
    }

    private hasUnitArrivedToTheEnd(action: GameLogicActionMoveToDTO): boolean {
        return action.data.path.length <= action.data.currentPathStep + 1;
    }

    private findNearestFreeTile(unit: UnitGenericDTO): CoordinatesEntity {
        return this.mapBlockedTilesManagerService.getNearestFreeTile({ xCoordinate: unit.xCoordinate, yCoordinate: unit.yCoordinate});
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

    private isARaceToFindTheNextFreeTile(action: GameLogicActionMoveToDTO, path: PathFindingCoordinate[]): boolean {
        
        if(action.data.checkIfEndPathIsOccupied) {
            const unit = this.unitsRepositoryService.findById(action.ownerId);
            const lastCoordinateIndex = path.length - 1;
            unit.xCoordinate = path[lastCoordinateIndex].xCoordinate;
            unit.yCoordinate = path[lastCoordinateIndex].yCoordinate;
            
            return this.isTheTileOccupiedByOtherUnit(unit);
        } else {
            return false;
        }
        
    }
}