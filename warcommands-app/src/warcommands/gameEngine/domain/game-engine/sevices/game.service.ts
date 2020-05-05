import { MapType } from '../../maps/model/map-type.enum';
import { MapEngineService } from '../../maps/services/map-engine.service';
import { MapConfiguration } from '../../maps/model/map-configuration.interface';
import { MapConfigurationFactory } from '../../maps/services/map-configuration-factory.service';
import { BuildingsManagerService } from '../../building/services/buildings-manager.service';
import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { GameInitializedEvent } from '../../game-event-bus/model/game-initialized-event';
import { PlayerCommandsManagerService } from '../../player-commands/player-commands-manager.service';
import { FileJsonDTO } from '../../file/file-json.dto';
import { DifficultyLevel } from '../../player/model/difficulty-level.enum';
import { PlayerManagerService } from '../../player/services/player-manager.service';
import { GameLogicService } from './game-logic.service';
import { GameEngineEventListenerHubService } from './game-engine-event-listener-hub.service';
import { InitialBuildingsManagerService } from '../../building/services/initial-buildings-manager.service';

export class GameService {

    private isInitialized: boolean;

    private mapType: MapType;

    constructor(
        private readonly gameEngineEventListenerHubService: GameEngineEventListenerHubService,
        private readonly mapEngine: MapEngineService,
        private readonly buildingsManagerService: BuildingsManagerService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly playerCommandsManagerService: PlayerCommandsManagerService,
        private readonly playerManagerService: PlayerManagerService,
        private readonly gameLogicService: GameLogicService,
        private readonly initialBuildingsManagerService: InitialBuildingsManagerService
    ) {}

    setMap(mapType: MapType): void {
        this.mapType = mapType;
    }

    addPlayer(playerId: string): void {
        this.playerManagerService.addPlayer(playerId);
    }

    addIAPlayer(difficultyLevel: DifficultyLevel): void {
        this.playerManagerService.addIAPlayer(difficultyLevel);
    }

    initialize() {

        if (this.mapType === undefined) {
            throw new Error('There is no map selected.');
        }

        const mapConfiguration: MapConfiguration = MapConfigurationFactory.getMapConfiguration(this.mapType);

        if (mapConfiguration.numberOfPlayers !== this.playerManagerService.getNumberOfPlayers()) {
            throw new Error('Wrong number of players');
        }

        this.mapEngine.generateMap(mapConfiguration);
        this.buildingsManagerService.initializeFromMap(mapConfiguration);
        this.initialBuildingsManagerService.initializeFromMap(mapConfiguration);
        
        this.isInitialized = true;

        const initializedEvent: GameInitializedEvent = new GameInitializedEvent();
        this.gameEventBusService.cast(initializedEvent);
    }

    start() {

        if (!this.isInitialized) {
            throw new Error('The game has not been initialized');
        }

        this.runPlayerCommands();
        this.gameLogic();
    }

    addFile(file: FileJsonDTO): void {
        this.playerCommandsManagerService.addFile(file);
    }

    private runPlayerCommands(): void {
        setTimeout(() => {this.runPlayerCommands()}, 300);
        this.playerCommandsManagerService.runPlayerCommands();
    }

    private gameLogic(): void {
        setTimeout(() => this.gameLogic(), 150);
        this.gameLogicService.gameLogicLoop();
        const postLogic = (performance || Date ).now();
    }

}
