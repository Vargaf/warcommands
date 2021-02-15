import { Injectable, ViewContainerRef } from '@angular/core';
import { GameService } from '../gameEngine/domain/game-engine/sevices/game.service';
import { BasicModeGameEngineService } from '../basic-mode/game-engine-basic-mode.service';
import { MapType } from '../gameEngine/domain/maps/model/map-type.enum';
import { GameEngineListenersService } from './game-engine-listeners.service';
import { GameServiceListenersService } from './game-service-listeners.service';
import { FileManagerService } from '../commands-panel/domain/file/services/file-manager.service';
import { DifficultyLevel } from '../gameEngine/domain/player/model/difficulty-level.enum';

@Injectable({
    providedIn: 'root'
})
export class GameMiddlewareService {

    constructor(
        private readonly gameService: GameService,
        private readonly gameEngine: BasicModeGameEngineService,
        private readonly gameEngineListeners: GameEngineListenersService,
        private readonly gameServiceListeners: GameServiceListenersService,
        private readonly fileManagerService: FileManagerService,
    ) {
        this.gameEngineListeners.setListeners();
        this.gameServiceListeners.setListeners();
    }

    setMap(mapType: MapType): void {
        this.gameService.setMap(mapType);
    }

    addPlayer(playerId: string): void {
        this.gameService.addPlayer(playerId);
    }

    addIAPlayer(difficultyLevel: DifficultyLevel): void {
        this.gameService.addIAPlayer(difficultyLevel);
    }

    initialize(gameViewContainerRef: ViewContainerRef): void {
        this.gameEngine.setViewContainerRef(gameViewContainerRef);
        this.gameService.initialize();

        this.fileManagerService.loadFiles();

        //this.gameEngine.start();
        //this.gameService.start();
    }

    pauseGame(): void {
        this.gameEngine.pauseGame();
        this.gameService.pauseGame();
    }

    resumeGame(): void {
        this.gameEngine.resumeGame();
        this.gameService.resumeGame();
    }

}