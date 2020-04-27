import { GameService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game.service';
import { MapEngineService } from 'src/warcommands/gameEngine/domain/maps/services/map-engine.service';
import { BuildingsManagerService } from 'src/warcommands/gameEngine/domain/building/services/buildings-manager.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { PlayerCommandsManagerService } from 'src/warcommands/gameEngine/domain/player-commands/player-commands-manager.service';
import { PlayerManagerService } from 'src/warcommands/gameEngine/domain/player/services/player-manager.service';
import { GameLogicService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic.service';
import { GameEngineEventListenerHubService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-engine-event-listener-hub.service';
import { InitialBuildingsManagerService } from 'src/warcommands/gameEngine/domain/building/services/initial-buildings-manager.service';

const factory = (
    gameEngineEventListenerHubService: GameEngineEventListenerHubService,
    mapEngine: MapEngineService,
    buildPlaceManagerService: BuildingsManagerService,
    gameEventBusService: GameEventBusService,
    playerCommandsManagerService: PlayerCommandsManagerService,
    playerManagerService: PlayerManagerService,
    gameLogicService: GameLogicService,
    initialBuildingsManagerService: InitialBuildingsManagerService
    ) => {
    return new GameService(
        gameEngineEventListenerHubService,
        mapEngine,
        buildPlaceManagerService,
        gameEventBusService,
        playerCommandsManagerService,
        playerManagerService,
        gameLogicService,
        initialBuildingsManagerService
        );
};

export const provider = {
    provide: GameService,
    useFactory: factory,
    deps: [
        GameEngineEventListenerHubService,
        MapEngineService,
        BuildingsManagerService,
        GameEventBusService,
        PlayerCommandsManagerService,
        PlayerManagerService,
        GameLogicService,
        InitialBuildingsManagerService
    ]
};
