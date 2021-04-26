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
import { WarcommandsNgZone } from '../../share/warcommands-ng-zone.service';
import { GameLogicTimeFrameService } from './game-logic-time-frame.service';

export class GameService {

    private isInitialized!: boolean;

    private mapType!: MapType;

    private isGameRunning: boolean = true;

    constructor(
        private readonly gameEngineEventListenerHubService: GameEngineEventListenerHubService,
        private readonly mapEngine: MapEngineService,
        private readonly buildingsManagerService: BuildingsManagerService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly playerCommandsManagerService: PlayerCommandsManagerService,
        private readonly playerManagerService: PlayerManagerService,
        private readonly gameLogicService: GameLogicService,
        private readonly initialBuildingsManagerService: InitialBuildingsManagerService,
        private readonly warcommandsNgZoneService: WarcommandsNgZone,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
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

        this.runGame();
    }

    pauseGame(): void {
        this.gameLogicTimeFrameService.stop();
        this.isGameRunning = false;
    }

    resumeGame(): void {
        this.isGameRunning = true;
        this.runGame();
    }

    addFile(file: FileJsonDTO): void {
        this.playerCommandsManagerService.addFile(file);
    }

    private runGame(): void {
        this.warcommandsNgZoneService.runOutsideAngular(() => {
            this.gameLogicTimeFrameService.start();
            this.gameLogic();
            this.runPlayerCommands();
        });
    }

    private runPlayerCommands(): void {
        if (this.isGameRunning) {
            setTimeout(() => {this.runPlayerCommands()}, 1000);
            //const pre = (performance || Date ).now();
            this.playerCommandsManagerService.runPlayerCommands();    
            //const post = (performance || Date ).now();
            //console.log('Player commands: ' + (post - pre));
        }
    }

    private gameLogic(): void {
        if (this.isGameRunning) {
            setTimeout(() => this.gameLogic(), 16);
            //const pre = (performance || Date ).now();
            this.gameLogicService.gameLogicLoop();
            //const post = (performance || Date ).now();
            //console.log('Game logic: ' + (post - pre));
        }
    }

}
