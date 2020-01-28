import { Injectable } from '@angular/core';
import { GameEngineService } from '../interfaces/game-engine.service';

export class GameService {

    private isInitialized: boolean;
    private gameEngine: GameEngineService;

    initialize(gameEngine: GameEngineService) {

        this.gameEngine = gameEngine;
        this.gameEngine.initialize();

        this.isInitialized = true;
    }

    start() {

        if (!this.isInitialized) {
            throw new Error('The game has not been initialized');
        }

        this.gameEngine.start();
    }

}
