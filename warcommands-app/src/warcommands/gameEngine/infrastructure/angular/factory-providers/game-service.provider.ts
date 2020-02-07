import { GameService } from 'src/warcommands/gameEngine/domain/game.service';
import { MapEngineService } from 'src/warcommands/gameEngine/domain/maps/services/map-engine.service';
import { BuildPlaceManagerService } from 'src/warcommands/gameEngine/domain/build/services/build-place-manager.service';

const factory = (
    mapEngine: MapEngineService,
    buildPlaceManagerService: BuildPlaceManagerService
    ) => {
    return new GameService(mapEngine, buildPlaceManagerService);
};

export const provider = {
    provide: GameService,
    useFactory: factory,
    deps: [
        MapEngineService,
        BuildPlaceManagerService
    ]
};
