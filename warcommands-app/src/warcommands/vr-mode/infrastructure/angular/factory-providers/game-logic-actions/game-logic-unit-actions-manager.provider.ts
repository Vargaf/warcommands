import { GameLogicUnitActionsManager } from "src/warcommands/vr-mode/domain/game-logic-actions/services/game-logic-unit-actions-manager.service";
import { UnitsManagerService } from "src/warcommands/vr-mode/domain/units/services/units-manager.service";


const factory = (
    unitsManagerService: UnitsManagerService,
) => {
    return new GameLogicUnitActionsManager(
        unitsManagerService,
    );
};

export const provider = {
    provide: GameLogicUnitActionsManager,
    useFactory: factory,
    deps: [
        UnitsManagerService
    ]
};
