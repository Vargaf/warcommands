import { Injectable } from '@angular/core';
import { GameService } from '../gameEngine/domain/game-engine/sevices/game.service';
import { MapType } from '../gameEngine/domain/maps/model/map-type.enum';
import { GameEngineListenersService } from './game-engine-listeners.service';
import { GameServiceListenersService } from './game-service-listeners.service';
import { FileManagerService } from '../commands-panel/domain/file/services/file-manager.service';
import { DifficultyLevel } from '../gameEngine/domain/player/model/difficulty-level.enum';
import { GameEngineInterface } from './game-engine.interface';

@Injectable({
    providedIn: 'root'
})
export class GameMiddlewareService {

    private gameEngine!: GameEngineInterface | null;

    constructor(
        private readonly gameService: GameService,
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

    initialize(gameEngine: GameEngineInterface): void {
        this.gameEngine = gameEngine;
        this.gameEngine.initialize();
        this.gameService.initialize();

        this.fileManagerService.loadFiles();
    }

    pauseGame(): void {
        this.gameEngine?.pauseGame();
        this.gameService.pauseGame();
    }

    resumeGame(): void {
        this.gameEngine?.resumeGame();
        this.gameService.resumeGame();
    }

    speedUp(): void {
        this.gameEngine?.speedUp();
        this.gameService.speedUp();
    }

    slowDown(): void {
        this.gameEngine?.slowDown();
        this.gameService.slowDown();
    }

}