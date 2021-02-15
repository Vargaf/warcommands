import { MapEngineService } from 'src/warcommands/gameEngine/domain/maps/services/map-engine.service';
import { MapRepositoryService } from '../../../memory-repository/map/map-repository.service';
import { MapGeneratorService } from 'src/warcommands/gameEngine/domain/maps/services/map-generator.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { PathFindingManagerService } from 'src/warcommands/gameEngine/domain/maps/services/path-finding-manager.service';

const factory = (
    mapRepository: MapRepositoryService,
    mapGeneratorService: MapGeneratorService,
    gameEventBusService: GameEventBusService,
    pathFindingManagerService: PathFindingManagerService
    ) => {
    return new MapEngineService(
        mapRepository,
        mapGeneratorService,
        gameEventBusService,
        pathFindingManagerService
        );
};

export const provider = {
    provide: MapEngineService,
    useFactory: factory,
    deps: [
        MapRepositoryService,
        MapGeneratorService,
        GameEventBusService,
        PathFindingManagerService
    ]
};
