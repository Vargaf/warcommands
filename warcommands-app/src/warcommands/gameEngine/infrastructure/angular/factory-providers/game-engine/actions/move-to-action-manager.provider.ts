import { MoveToActionManagerService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/actions/move-to-action-manager-service';
import { GameLogicTimeFrameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic-time-frame.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-units-repository-service';
import { MapBlockedTilesManagerService } from 'src/warcommands/gameEngine/domain/maps/services/map-blocked-tiles-manager.service';

const factory = (
    gameLogicTimeFrameService: GameLogicTimeFrameService,
    unitsRepositoryService: UnitsRepositoryService,
    mapBlockedTilesManagerService: MapBlockedTilesManagerService,
) => {
    return new MoveToActionManagerService(
        gameLogicTimeFrameService,
        unitsRepositoryService,
        mapBlockedTilesManagerService
    );
};

export const provider = {
    provide: MoveToActionManagerService,
    useFactory: factory,
    deps: [
        GameLogicTimeFrameService,
        InMemoryUnitsRepositoryService,
        MapBlockedTilesManagerService
    ]
};