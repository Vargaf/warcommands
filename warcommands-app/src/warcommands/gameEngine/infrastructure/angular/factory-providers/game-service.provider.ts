import { GameService } from 'src/warcommands/gameEngine/domain/game.service';
import { MapEngineService } from 'src/warcommands/gameEngine/domain/maps/services/map-engine.service';
import { BuildPlaceManagerService } from 'src/warcommands/gameEngine/domain/build/services/build-place-manager.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { PlayerCommandsManagerService } from 'src/warcommands/gameEngine/domain/player-commands/player-commands-manager.service';

const factory = (
    mapEngine: MapEngineService,
    buildPlaceManagerService: BuildPlaceManagerService,
    gameEventBusService: GameEventBusService,
    playerCommandsManagerService: PlayerCommandsManagerService,
    ) => {
    return new GameService(mapEngine, buildPlaceManagerService, gameEventBusService, playerCommandsManagerService);
};

export const provider = {
    provide: GameService,
    useFactory: factory,
    deps: [
        MapEngineService,
        BuildPlaceManagerService,
        GameEventBusService,
        PlayerCommandsManagerService
    ]
};
