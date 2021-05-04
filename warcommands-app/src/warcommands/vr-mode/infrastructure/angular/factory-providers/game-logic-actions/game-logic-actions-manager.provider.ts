import { GameLogicActionsManager } from "src/warcommands/vr-mode/domain/game-logic-actions/services/game-logic-actions-manager.service";
import { GameLogicUnitActionsManager } from "src/warcommands/vr-mode/domain/game-logic-actions/services/game-logic-unit-actions-manager.service";


const factory = (
    unitActionsManager: GameLogicUnitActionsManager
) => {
    return new GameLogicActionsManager(
        unitActionsManager
    );
};

export const provider = {
    provide: GameLogicActionsManager,
    useFactory: factory,
    deps: [
        GameLogicUnitActionsManager
    ]
};
