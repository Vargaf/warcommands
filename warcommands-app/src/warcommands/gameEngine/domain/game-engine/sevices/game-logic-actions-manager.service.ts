import { UnitSuperAcionRepositopriService } from '../../units/unit-actions/unit-super-action-repository.service';
import { UnitSuperActionDTO } from '../../units/unit-actions/unit-super-action.dto';
import { UnitSuperActionStatusENUM } from '../../units/unit-actions/unit-super-action-status.enum';
import { UnitActionStatusENUM } from '../../units/unit-actions/unit-action-status.enum';
import { GameLogicActionManagerFactoryService } from '../../game-logic-actions/game-logic-action-manager-factory.service';
import { GameLogicActionManagerService } from '../../game-logic-actions/game-logic-action-manager.service';
import { UnitActionTypeENUM } from '../../units/unit-actions/unit-action-type.enum';
import { UnitActionGenericDTO } from '../../units/unit-actions/unit-action-generic.dto';

export class GameLogicActionsManagerService {

    constructor(
        private readonly unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
        private readonly gameLogicActionManagerFactoryService: GameLogicActionManagerFactoryService
    ) {}

    executeActions(): void {
        const superActionsList: UnitSuperActionDTO[] = this.unitSuperActionRepositoryService.getAll();

        for (let superAction of superActionsList) {
            if (this.isSuperActionManageable(superAction)) {
                superAction = this.handleSuperAction(superAction);
                this.unitSuperActionRepositoryService.save(superAction);
            }
        }
    }

    private isSuperActionManageable(superAction: UnitSuperActionDTO) {
        let isSuperActionManageable = false;

        switch (superAction.status) {
            case UnitSuperActionStatusENUM.PreparedToStart:
            case UnitSuperActionStatusENUM.InProgress:
            case UnitSuperActionStatusENUM.Finished: {
                isSuperActionManageable = true;
                break;
            }
            case UnitSuperActionStatusENUM.Initializing: {
                break;
            }
            default: {
                throw new Error('SuperAction status not recognized: ' + superAction.status);
            }
        }

        return isSuperActionManageable;
    }

    private handleSuperAction(superAction: UnitSuperActionDTO): UnitSuperActionDTO {
        
        const activeActionIndex = superAction.currentAtomicActionIndex;
        let activeAction = superAction.atomicActions[activeActionIndex];
        
        activeAction = this.handleAtomicAction(activeAction, superAction.unitId);
        superAction.atomicActions[activeActionIndex] = activeAction;

        if (activeAction.type === UnitActionTypeENUM.RewindSuperAction) {
            superAction.currentAtomicActionIndex = 0;
            superAction.status = UnitSuperActionStatusENUM.Finished;
        }

        if (activeAction.actionStatus === UnitActionStatusENUM.InProgress) {
            superAction.status = UnitSuperActionStatusENUM.InProgress;
        }

        if (activeAction.actionStatus === UnitActionStatusENUM.Finished) {
            superAction.currentAtomicActionIndex++;
        }

        return superAction;
    }

    private handleAtomicAction(action: UnitActionGenericDTO, unitId: string): UnitActionGenericDTO {

        const actionManager: GameLogicActionManagerService = this.gameLogicActionManagerFactoryService.getActionManager(action.type);

        switch (action.actionStatus) {
            case UnitActionStatusENUM.WaitingToStart: {
                action = actionManager.initializeAction(action, unitId);
                break;
            }
            case UnitActionStatusENUM.InProgress: {
                action = actionManager.actionInProgress(action, unitId);
                break;
            }
            case UnitActionStatusENUM.Finished: {
                action = actionManager.actionFinished(action, unitId);
                break;
            }
        }

        return action;
    }

}