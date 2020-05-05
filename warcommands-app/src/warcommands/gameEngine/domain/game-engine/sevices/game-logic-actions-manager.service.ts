import { UnitSuperAcionRepositopriService } from '../../units/unit-actions/unit-super-action-repository.service';
import { UnitSuperActionDTO } from '../../units/unit-actions/unit-super-action.dto';
import { UnitSuperActionStatusENUM } from '../../units/unit-actions/unit-super-action-status.enum';
import { UnitActionStatusENUM } from '../../units/unit-actions/unit-action-status.enum';
import { GameLogicActionManagerFactoryService } from '../../game-logic-actions/game-logic-action-manager-factory.service';
import { GameLogicActionManagerService } from '../../game-logic-actions/game-logic-action-manager.service';
import * as uuid from 'uuid';
import { UnitActionTypeENUM } from '../../units/unit-actions/unit-action-type.enum';

export class GameLogicActionsManagerService {

    constructor(
        private readonly unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
        private readonly gameLogicActionManagerFactoryService: GameLogicActionManagerFactoryService
    ) {}

    executeActions(): void {
        const superActionsList: UnitSuperActionDTO[] = this.unitSuperActionRepositoryService.getAll();

        for (let superAction of superActionsList) {
            if (this.isSuperActionPreparedToStart(superAction)) {
                superAction = this.handleSuperAction(superAction);
                this.unitSuperActionRepositoryService.save(superAction);
            }
        }
    }

    private isSuperActionPreparedToStart(superAction: UnitSuperActionDTO) {
        return superAction.status === UnitSuperActionStatusENUM.PreparedToStart;
    }

    private handleSuperAction(superAction: UnitSuperActionDTO): UnitSuperActionDTO {
        const activeActionIndex = superAction.currentAtomicActionIndex;
        let activeAction = superAction.atomicActions[activeActionIndex];
        
        if (activeAction.type === UnitActionTypeENUM.RewindSuperAction) {
            superAction.currentAtomicActionIndex = 0;
            return superAction;
        }

        const actionManager: GameLogicActionManagerService = this.gameLogicActionManagerFactoryService.getActionManager(activeAction.type);

        if (activeAction.actionStatus === UnitActionStatusENUM.WaitingToStart) {
            activeAction.id = uuid();
            activeAction = actionManager.initializeAction(activeAction, superAction.unitId);
        }

        if (activeAction.actionStatus === UnitActionStatusENUM.InProgress) {
            activeAction = actionManager.actionInProgress(activeAction, superAction.unitId);
        }

        if (activeAction.actionStatus === UnitActionStatusENUM.Finished) {
            activeAction.actionStatus = UnitActionStatusENUM.WaitingToStart;
            superAction.atomicActions[activeActionIndex] = activeAction;
            superAction.currentAtomicActionIndex++;
            superAction = this.handleSuperAction(superAction);
        } else {
            superAction.atomicActions[activeActionIndex] = activeAction;
        }


        return superAction;
    }

}