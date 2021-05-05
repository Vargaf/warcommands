import { GameLogicActionsRepositoryInterface } from '../../game-logic-actions/services/game-logic-actions-repository.interface';
import { GameLogicActionDTO } from '../../game-logic-actions/model/game-logic-action.dto';
import { GameLogicActionStatusENUM } from '../../game-logic-actions/model/game-logic-action-status.enum';
import { GameLogicActionManagerFactory } from '../../game-logic-actions/services/game-logic-action-manager-factory.service';
import { UnitsRepositoryService } from '../../units/services/units-repository.service';
import { GameLogicActionOwnerTypeENUM } from '../../game-logic-actions/model/game-logic-action-owner-type.enum';
import { GameLogicActionTypeENUM } from '../../game-logic-actions/model/game-logic-action-type.enum';

export class GameLogicActionsManagerService {

    constructor(
        private readonly gameLogicActionsRepositoryService: GameLogicActionsRepositoryInterface,
        private readonly gameLogicActionManagerFactory: GameLogicActionManagerFactory,
        private readonly unitsRepository: UnitsRepositoryService,
    ) {}

    processActions(): void {
        const actionList = this.gameLogicActionsRepositoryService.findAll();

        for(let action of actionList) {
            if(this.canBeProcessed(action)) {
                action = this.processAction(action);

                if(this.isActionFinished(action)) {
                    this.removeAction(action);
                }
            }
        }
    }

    private processAction(action: GameLogicActionDTO): GameLogicActionDTO {

        // Bear in mind that here we can't remove an action, this should be done
        // at the processActions function to avod deleting sub actions by accident 

        const actionManager = this.gameLogicActionManagerFactory.getActionManager(action);

        switch(action.status) {
            case GameLogicActionStatusENUM.Created:
                action = actionManager.initializeAction(action);
                break;
            case GameLogicActionStatusENUM.InProgress:
                action = actionManager.processAction(action);
                action = this.processSubActions(action);
                break;
            case GameLogicActionStatusENUM.Finished:
                action = actionManager.tearDownAction(action);
                break;
        }

        this.gameLogicActionsRepositoryService.save(action);

        return action;
    }

    private isActionFinished(action: GameLogicActionDTO): boolean {
        return action.status === GameLogicActionStatusENUM.Finished;
    }

    private canBeProcessed(action: GameLogicActionDTO): boolean {
        return (action.status === GameLogicActionStatusENUM.Created ||
            action.status === GameLogicActionStatusENUM.InProgress ||
            action.status === GameLogicActionStatusENUM.Finished) &&
            action.parentActionId === null;
    }

    private removeAction(action: GameLogicActionDTO): void {

        const actionManager = this.gameLogicActionManagerFactory.getActionManager(action);
        actionManager.tearDownAction(action);

        this.gameLogicActionsRepositoryService.remove(action);
        
        if(this.isUnitOwner(action)) {
            const unit = this.unitsRepository.findById(action.ownerId);
            unit.action = null;
            this.unitsRepository.save(unit);
        }
    }

    private isUnitOwner(action: GameLogicActionDTO): boolean {
        return action.ownerType === GameLogicActionOwnerTypeENUM.Unit;
    }

    private processSubActions(action: GameLogicActionDTO): GameLogicActionDTO {
        if(action.subActionsIdList && action.subActionsIdList.length > 0) {
            const activeActionIndex = action.activeAction;
            const activeActionId = action.subActionsIdList[activeActionIndex];
            let activeAction = this.gameLogicActionsRepositoryService.findById(activeActionId);
            
            if (activeAction.type === GameLogicActionTypeENUM.Rewind) {
                action.activeAction = 0;

                const actionManager = this.gameLogicActionManagerFactory.getActionManager(action);
                action = actionManager.rewindAction(action);
            } else {
                activeAction = this.processAction(activeAction);
            }

            if (activeAction.status === GameLogicActionStatusENUM.Finished) {
                action.activeAction++;
            }
        }

        return action;
    }
}