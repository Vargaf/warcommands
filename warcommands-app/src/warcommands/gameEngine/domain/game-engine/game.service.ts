import { MapType } from '../maps/model/map-type.enum';
import { MapEngineService } from '../maps/services/map-engine.service';
import { MapConfiguration } from '../maps/model/map-configuration.interface';
import { MapConfigurationFactory } from '../maps/services/map-configuration-factory.service';
import { BuildingsManagerService } from '../building/services/buildings-manager.service';
import { GameEventBusService } from '../game-event-bus/services/game-event-bus.service';
import { GameInitializedEvent } from '../game-event-bus/model/game-initialized-event';
import { PlayerCommandsManagerService } from '../player-commands/player-commands-manager.service';
import { FileJsonDTO } from '../file/file-json.dto';
import { DifficultyLevel } from '../player/model/difficulty-level.enum';
import { PlayerManagerService } from '../player/services/player-manager.service';
import { PlayersBaseListEntity } from '../base/players-base-list.entity';
import { BaseEntity } from '../base/base.entity';
import { PlayerDTO } from '../player/model/player.dto';

export class GameService {

    private isInitialized: boolean;

    private mapType: MapType;

    constructor(
        private readonly mapEngine: MapEngineService,
        private readonly buildingsManagerService: BuildingsManagerService,
        private readonly gameEventBusService: GameEventBusService,
        private readonly playerCommandsManagerService: PlayerCommandsManagerService,
        private readonly playerManagerService: PlayerManagerService,
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
        this.addInitialBases(mapConfiguration);

        this.isInitialized = true;

        const initializedEvent: GameInitializedEvent = new GameInitializedEvent();
        this.gameEventBusService.cast(initializedEvent);
    }

    start() {

        if (!this.isInitialized) {
            throw new Error('The game has not been initialized');
        }

        this.runGameLoop();
    }

    addFile(file: FileJsonDTO): void {
        this.playerCommandsManagerService.addFile(file);
    }

    private addInitialBases(mapConfiguration: MapConfiguration) {

        const randomizedBaseIndexList: string[] = this.getRandomizedBaseIndexList(mapConfiguration.playerBaseList);
        const playerList = this.playerManagerService.getPlayerList();
        const baseList = mapConfiguration.playerBaseList;

        // tslint:disable-next-line: forin
        for (const index in randomizedBaseIndexList) {
            const randomIndex = randomizedBaseIndexList[index];
            const base: BaseEntity = baseList[randomIndex];
            const player: PlayerDTO = playerList[index];

            base.playerId = player.id;
            this.buildingsManagerService.addBuilding(base);
        }
    }

    private getRandomizedBaseIndexList(baseList: PlayersBaseListEntity): string[] {
        const randomizedBaseIndexList: string[] = Object.keys(baseList);
        return randomizedBaseIndexList.sort((a,b) => { return 0.5 - Math.random()});
    }

    private runGameLoop(): void {
        this.playerCommandsManagerService.runGameLoop();
        setTimeout(() => {this.runGameLoop()}, 50);
    }

}
