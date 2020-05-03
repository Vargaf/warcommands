import { GameLogicSpawningUnitsManager } from './game-logic-spawning-units-manager.service';
import { GameLogicTimeFrameService } from './game-logic-time-frame.service';
import { GameLogicWorkerActionsManagerService } from './worker/game-logic-worker-actions-manager.service';
import { PathFindingManagerService } from '../../maps/services/path-finding-manager.service';

export class GameLogicService {

    constructor(
        private readonly gameLogicSpawningUnitsManager: GameLogicSpawningUnitsManager,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly gameLogicWorkerActionsManager: GameLogicWorkerActionsManagerService,
        private readonly pathFindingManager: PathFindingManagerService
    ) {}

    gameLogicLoop() {
        this.gameLogicTimeFrameService.updateFrameTime();
        this.gameLogicSpawningUnitsManager.spawnUnits();
        this.gameLogicSpawningUnitsManager.enqueueUnits();
        this.gameLogicWorkerActionsManager.workerActions();
        this.pathFindingManager.calculatePathFinding();
    }

}