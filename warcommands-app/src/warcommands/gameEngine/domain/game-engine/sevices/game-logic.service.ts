import { GameLogicSpawningUnitsManager } from './game-logic-spawning-units-manager.service';
import { GameLogicTimeFrameService } from './game-logic-time-frame.service';
import { PathFindingManagerService } from '../../maps/services/path-finding-manager.service';
import { GameLogicActionsManagerService } from './game-logic-actions-manager.service';
import { IdleUnitsManager } from './idle-units-manager.service';

export class GameLogicService {

    constructor(
        private readonly gameLogicSpawningUnitsManager: GameLogicSpawningUnitsManager,
        private readonly gameLogicTimeFrameService: GameLogicTimeFrameService,
        private readonly pathFindingManager: PathFindingManagerService,
        private readonly gameLogicActionsManager: GameLogicActionsManagerService,
        private readonly idleUnitsManager: IdleUnitsManager,
    ) {}

    gameLogicLoop() {
        this.gameLogicTimeFrameService.updateFrameTime();

        let pre = (performance || Date ).now();
        this.gameLogicSpawningUnitsManager.spawnUnits();
        let post = (performance || Date ).now();
        //console.log('Spawning units: ' + (post - pre));

        
        
        pre = (performance || Date ).now();
        this.idleUnitsManager.execute();
        post = (performance || Date ).now();
        //console.log('Worker actions: ' + (post - pre));        
        
        
        pre = (performance || Date ).now();
        this.gameLogicActionsManager.processActions();
        post = (performance || Date ).now();
        //console.log('Execute actions: ' + (post - pre));

        pre = (performance || Date ).now();
        this.pathFindingManager.calculatePathFinding();
        post = (performance || Date ).now();
        //console.log('Pathfinding: ' + (post - pre));
    }

}