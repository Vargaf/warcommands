import { GameLogicSpawningUnitsManager } from './game-logic-spawning-units-manager.service';

export class GameLogicService {

    constructor(
        private readonly gameLogicSpawningUnitsManager: GameLogicSpawningUnitsManager
    ) {}

    gameLogicLoop() {
        this.gameLogicSpawningUnitsManager.spawnUnits();
    }

}