import { GameEngineService } from '../interfaces/game-engine.service';
import { MapType } from './maps/model/map-type.enum';
import { MapInterface } from '../interfaces/model/map/map.interface';
import { MapEngineService } from './maps/services/map-engine.service';
import { MapConfiguration } from './maps/model/map-configuration.interface';
import { MapConfigurationFactory } from './maps/services/map-configuration-factory.service';
import { BuildPlaceManagerService } from './build/services/build-place-manager.service';

export class GameService {

    private isInitialized: boolean;
    private gameEngine: GameEngineService;

    constructor(
        private mapEngine: MapEngineService,
        private buildPlaceManagerService: BuildPlaceManagerService
    ) {}

    initialize(gameEngine: GameEngineService) {

        const mapType = MapType.OnlyGrass;
        const mapConfiguration: MapConfiguration = MapConfigurationFactory.getMapConfiguration(mapType);

        this.gameEngine = gameEngine;
        this.gameEngine.initialize();

        this.generateMap(mapConfiguration);
        this.buildPlaceManagerService.initializeFromPathfindingGrid();
        this.addInitialBases(mapConfiguration);

        this.isInitialized = true;
    }

    start() {

        if (!this.isInitialized) {
            throw new Error('The game has not been initialized');
        }

        this.gameEngine.start();
    }

    private generateMap(mapConfiguration: MapConfiguration): void {
        const mapResponse: MapInterface = this.mapEngine.generateMap(mapConfiguration);
        this.gameEngine.generateMap(mapResponse);
    }

    private addInitialBases(mapConfiguration: MapConfiguration) {
        for (const baseIndex of Object.keys(mapConfiguration.playerBaseList)) {
            this.buildPlaceManagerService.addBuilding(mapConfiguration.playerBaseList[baseIndex]);
            this.gameEngine.addBase(mapConfiguration.playerBaseList[baseIndex]);
        }
    }

}
