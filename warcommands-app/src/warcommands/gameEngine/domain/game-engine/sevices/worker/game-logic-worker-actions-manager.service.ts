import { GameLogicInitializeWorkerActionsService } from './game-logic-initialize-worker-actions.service';

export class GameLogicWorkerActionsManagerService {

    private readonly atomicActionsNumber = 5;

    constructor(
        private readonly gameLogicInitializeWorkerActionsService: GameLogicInitializeWorkerActionsService
    ) {}

    workerActions(): void {
        this.gameLogicInitializeWorkerActionsService.initializeActions();
    }
}