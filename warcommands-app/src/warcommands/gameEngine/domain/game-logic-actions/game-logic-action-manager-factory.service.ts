import { GameLogicMoveToActionManagerService } from './game-logic-move-to-action-manager.service';
import { UnitActionTypeENUM } from '../units/unit-actions/unit-action-type.enum';
import { GameLogicActionManagerService } from './game-logic-action-manager.service';
import { GameLogicHarvestActionManagerService } from './game-logic-harvest-action-manager.service';
import { GameLogicDeliverActionManagerService } from './game-logic-deliver-action-manager.service';
import { GameLogicRewindActionManagerService } from './game-logic-rewind-action-manager.service';

export class GameLogicActionManagerFactoryService {

    constructor(
        private readonly gameLogicMoveToActionManagerService: GameLogicMoveToActionManagerService,
        private readonly gameLogicHarvesActionManagerService: GameLogicHarvestActionManagerService,
        private readonly gameLogicDeliverActionManagerService: GameLogicDeliverActionManagerService,
        private readonly gameLogicRewindActionManagerService: GameLogicRewindActionManagerService,
    ) {}

    getActionManager(actionType: UnitActionTypeENUM): GameLogicActionManagerService {
        let service!: GameLogicActionManagerService;

        switch (actionType) {
            case UnitActionTypeENUM.MoveTo: {
                service = this.gameLogicMoveToActionManagerService;
                break;
            }
            case UnitActionTypeENUM.Harvest: {
                service = this.gameLogicHarvesActionManagerService;
                break;
            }
            case UnitActionTypeENUM.Deliver: {
                service = this.gameLogicDeliverActionManagerService;
                break;
            }
            case UnitActionTypeENUM.RewindSuperAction: {
                service = this.gameLogicRewindActionManagerService;
                break;
            }
            default: {
                throw new Error('Action type unrecognized: ' + actionType);
            }
        }

        return service;
    }

}