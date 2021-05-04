import { UnitSuperAcionRepositopriService } from '../../units/unit-actions/unit-super-action-repository.service';
import { UnitSuperActionDTO } from '../../units/unit-actions/unit-super-action.dto';
import { UnitSuperActionStatusENUM } from '../../units/unit-actions/unit-super-action-status.enum';
import { UnitActionStatusENUM } from '../../units/unit-actions/unit-action-status.enum';
import { GameLogicActionManagerFactoryService } from '../../game-logic-actions/game-logic-action-manager-factory.service';
import { GameLogicActionManagerService } from '../../game-logic-actions/game-logic-action-manager.service';
import { UnitActionTypeENUM } from '../../units/unit-actions/unit-action-type.enum';
import { UnitActionGenericDTO } from '../../units/unit-actions/unit-action-generic.dto';
import { GameLogicActionsRepositoryInterface } from '../../game-logic-actions/services/game-logic-actions-repository.interface';
import { GameLogicActionDTO } from '../../game-logic-actions/model/game-logic-action.dto';
import { GameLogicActionStatusENUM } from '../../game-logic-actions/model/game-logic-action-status.enum';
import { GameLogicActionManagerFactory } from '../../game-logic-actions/services/game-logic-action-manager-factory.service';
import { UnitsRepositoryService } from '../../units/services/units-repository.service';
import { GameLogicActionOwnerTypeENUM } from '../../game-logic-actions/model/game-logic-action-owner-type.enum';
import { GameLogicActionTypeENUM } from '../../game-logic-actions/model/game-logic-action-type.enum';

export class GameLogicActionsManagerService {

    constructor(
        private readonly unitSuperActionRepositoryService: UnitSuperAcionRepositopriService,
        private readonly gameLogicActionManagerFactoryService: GameLogicActionManagerFactoryService,
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

        // Bear in mind that here we cant remove an action, this should be done
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

    

    private handleSuperAction(superAction: UnitSuperActionDTO): UnitSuperActionDTO {
        
        const activeActionIndex = superAction.currentAtomicActionIndex;
        let activeAction = <UnitActionGenericDTO>superAction.atomicActions[activeActionIndex];
        
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