import { GameLogicActionsRepositoryInterface } from '../../game-logic-actions/services/game-logic-actions-repository.interface';
import { GameLogicActionDTO } from '../../game-logic-actions/model/game-logic-action.dto';
import { GameLogicActionStatusENUM } from '../../game-logic-actions/model/game-logic-action-status.enum';
import { GameLogicActionManagerFactory } from '../../game-logic-actions/services/game-logic-action-manager-factory.service';
import { UnitsRepositoryService } from '../../units/services/units-repository.service';
import { GameLogicActionOwnerTypeENUM } from '../../game-logic-actions/model/game-logic-action-owner-type.enum';
import { GameLogicActionTypeENUM } from '../../game-logic-actions/model/game-logic-action-type.enum';
import { UnitGenericDTO } from '../../units/model/unit-generic.dto';
import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { GameLogicActionVoidCreator } from '../../game-logic-actions/model/game-logic-action-void.dto';
import { GameLogicActionUpdatedEvent } from '../events/game-logic-action-updated.event';

export class GameLogicActionsManagerService {

    constructor(
        private readonly gameLogicActionsRepositoryService: GameLogicActionsRepositoryInterface,
        private readonly gameLogicActionManagerFactory: GameLogicActionManagerFactory,
        private readonly unitsRepository: UnitsRepositoryService,
        private readonly gameEventBusService: GameEventBusService,
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

    removeUnitAction(unit: UnitGenericDTO): UnitGenericDTO {
        const action = this.gameLogicActionsRepositoryService.findById(unit.actionId);
        this.removeAction(action);

        unit.actionId = '';
        return unit;
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

    private isUnitOwner(action: GameLogicActionDTO): boolean {
        return action.ownerType === GameLogicActionOwnerTypeENUM.Unit;
    }

    private processSubActions(action: GameLogicActionDTO): GameLogicActionDTO {
        if(!this.isActionFinished(action) && this.hasSubActions(action)) {
            if(this.isActionInWrongState(action)) {
                console.error('The action should have finished');
            } else {
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
                    const actionManager = this.gameLogicActionManagerFactory.getActionManager(action);
                    action = actionManager.subActionFinished(action, activeAction.id);
                    action.activeAction++;
                }
            }
        }

        return action;
    }

    private hasSubActions(action: GameLogicActionDTO): boolean {
        return action.subActionsIdList != null && action.subActionsIdList.length > 0;
    }

    private isActionInWrongState(action: GameLogicActionDTO): boolean {
        return action.subActionsIdList.length > 0 &&
            action.subActionsIdList.length <= action.activeAction
    }

    private removeAction(action: GameLogicActionDTO): void {

        const actionManager = this.gameLogicActionManagerFactory.getActionManager(action);
        actionManager.tearDownAction(action);

        this.gameLogicActionsRepositoryService.remove(action);
        
        if(this.isUnitOwner(action)) {
            const unit = this.unitsRepository.findById(action.ownerId);
            unit.actionId = '';
            this.unitsRepository.save(unit);
        }

        const voidAction = GameLogicActionVoidCreator.create(action.ownerId, action.ownerType);
        const event: GameLogicActionUpdatedEvent = new GameLogicActionUpdatedEvent(voidAction);
        this.gameEventBusService.cast(event);
    }
}