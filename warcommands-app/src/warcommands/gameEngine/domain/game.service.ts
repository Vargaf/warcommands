import { MapType } from './maps/model/map-type.enum';
import { MapInterface } from '../interfaces/model/map/map.interface';
import { MapEngineService } from './maps/services/map-engine.service';
import { MapConfiguration } from './maps/model/map-configuration.interface';
import { MapConfigurationFactory } from './maps/services/map-configuration-factory.service';
import { BuildPlaceManagerService } from './build/services/build-place-manager.service';
import { GameEventBusService } from './game-event-bus/services/game-event-bus.service';
import { GameInitializedEvent } from './game-event-bus/model/game-initialized-event';
import { GeneratingMapEvent } from './game-event-bus/model/map/generating-map.event';
import { MapGeneratedEvent } from './game-event-bus/model/map/map-generated.event';
import { BaseCreaedEvent } from './game-event-bus/model/base/base-created.event';
import { PlayerCommandsManagerService } from './player-commands/player-commands-manager.service';
import { FileJsonDTO } from './file/file-json.dto';

export class GameService {

    private isInitialized: boolean;

    constructor(
        private readonly mapEngine: MapEngineService,
        private readonly buildPlaceManagerService: BuildPlaceManagerService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly playerCommandsManagerService: PlayerCommandsManagerService
    ) {}

    initialize(mapType: MapType) {

        const mapConfiguration: MapConfiguration = MapConfigurationFactory.getMapConfiguration(mapType);

        this.generateMap(mapConfiguration);
        this.buildPlaceManagerService.initializeFromPathfindingGrid();
        this.addInitialBases(mapConfiguration);

        this.isInitialized = true;

        const initializedEvent: GameInitializedEvent = new GameInitializedEvent();
        this.gameEventBusService.cast(initializedEvent);
    }

    start() {

        if (!this.isInitialized) {
            throw new Error('The game has not been initialized');
        }
    }

    addFile(file: FileJsonDTO): void {
        this.playerCommandsManagerService.addFile(file);
    }

    private generateMap(mapConfiguration: MapConfiguration): void {
        const generatingMapEvent = new GeneratingMapEvent();
        this.gameEventBusService.cast(generatingMapEvent);

        const mapResponse: MapInterface = this.mapEngine.generateMap(mapConfiguration);

        const mapGeneratedEvent = new MapGeneratedEvent(mapResponse);
        this.gameEventBusService.cast(mapGeneratedEvent);
    }

    private addInitialBases(mapConfiguration: MapConfiguration) {
        for (const baseIndex of Object.keys(mapConfiguration.playerBaseList)) {
            this.buildPlaceManagerService.addBuilding(mapConfiguration.playerBaseList[baseIndex]);

            const baseCreatedEvent = new BaseCreaedEvent(mapConfiguration.playerBaseList[baseIndex]);
            this.gameEventBusService.cast(baseCreatedEvent);
        }
    }

}
