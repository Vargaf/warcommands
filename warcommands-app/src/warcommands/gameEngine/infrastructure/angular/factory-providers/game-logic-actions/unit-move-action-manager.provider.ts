import { GameLogicTimeFrameService } from "src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service";
import { GameEventBusService } from "src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service";
import { GameLogicActionsRepositoryInterface } from "src/warcommands/gameEngine/domain/game-logic-actions/services/game-logic-actions-repository.interface";
import { UnitMoveActionManager } from "src/warcommands/gameEngine/domain/game-logic-actions/services/unit-move-action-manager.service";
import { MapBlockedTilesManagerService } from "src/warcommands/gameEngine/domain/maps/services/map-blocked-tiles-manager.service";
import { PathFindingManagerService } from "src/warcommands/gameEngine/domain/maps/services/path-finding-manager.service";
import { UnitsRepositoryService } from "src/warcommands/gameEngine/domain/units/services/units-repository.service";
import { InMemoryGameLogicActionsRepositoryService } from "../../../memory-repository/game-logic-actions/in-memory-game-logic-actions-repository.service";
import { InMemoryUnitsRepositoryService } from "../../../memory-repository/unit/in-memory-units-repository-service";

const factory = (
    pathFindingManager: PathFindingManagerService,
    unitsRepositoryService: UnitsRepositoryService,
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    mapBlockedTilesManagerService: MapBlockedTilesManagerService,
    gameEventBusService: GameEventBusService,
    gamelogicActionRepository: GameLogicActionsRepositoryInterface,
) => {
    return new UnitMoveActionManager(
        pathFindingManager,
        unitsRepositoryService,
        gameLogicTimeFrameService,
        mapBlockedTilesManagerService,
        gameEventBusService,
        gamelogicActionRepository,
    );
};

export const provider = {
    provide: UnitMoveActionManager,
    useFactory: factory,
    deps: [
        PathFindingManagerService,
        InMemoryUnitsRepositoryService,
        GameLogicTimeFrameService,
        MapBlockedTilesManagerService,
        GameEventBusService,
        InMemoryGameLogicActionsRepositoryService,
    ]
};