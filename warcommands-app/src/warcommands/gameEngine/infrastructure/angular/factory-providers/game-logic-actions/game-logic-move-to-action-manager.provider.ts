import { GameLogicMoveToActionManagerService } from 'src/warcommands/gameEngine/domain/game-logic-actions/game-logic-move-to-action-manager.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { MapBlockedTilesManagerService } from 'src/warcommands/gameEngine/domain/maps/services/map-blocked-tiles-manager.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { InMemoryUnitsRepositoryService } from '../../../memory-repository/unit/in-memory-units-repository-service';
import { PathFindingManagerService } from 'src/warcommands/gameEngine/domain/maps/services/path-finding-manager.service';

const factory = (
    unitsRepositoryService: UnitsRepositoryService,
    mapBlockedTilesManagerService: MapBlockedTilesManagerService,
    gameEventBusService: GameEventBusService,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    pathFindingManager: PathFindingManagerService,
) => {
    return new GameLogicMoveToActionManagerService(
        unitsRepositoryService,
        mapBlockedTilesManagerService,
        gameEventBusService,
        gameLogicTimeFrameService,
        pathFindingManager
    );
};

export const provider = {
    provide: GameLogicMoveToActionManagerService,
    useFactory: factory,
    deps: [
        InMemoryUnitsRepositoryService,
        MapBlockedTilesManagerService,
        GameEventBusService,
        GameLogicTimeFrameService,
        PathFindingManagerService
    ]
};