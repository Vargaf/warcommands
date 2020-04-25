import { GameLogicSpawningUnitsManager } from './game-logic-spawning-units-manager.service';
import { GameLogicTimeFrameService } from './game-logic-time-frame.service';

export class GameLogicService {

    constructor(
        private readonly gameLogicSpawningUnitsManager: GameLogicSpawningUnitsManager,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService
    ) {}

    gameLogicLoop() {
        this.gameLogicTimeFrameService.updateFrameTime();
        this.gameLogicSpawningUnitsManager.spawnUnits();
        this.gameLogicSpawningUnitsManager.enqueueUnits();

    }

}