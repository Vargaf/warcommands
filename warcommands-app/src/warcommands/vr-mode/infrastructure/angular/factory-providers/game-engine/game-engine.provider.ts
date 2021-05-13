import { BuildingsManagerService } from "src/warcommands/vr-mode/domain/buildings/service/buildings-manager-service";
import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";
import { VrModeGameEngineService } from "src/warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service";
import { GameLogicActionsManager } from "src/warcommands/vr-mode/domain/game-logic-actions/services/game-logic-actions-manager.service";
import { UnitsManagerService } from "src/warcommands/vr-mode/domain/units/services/units-manager.service";
import { AframeSceneService } from "src/warcommands/vr-mode/infrastructure/aframe/aframe-scene.service";
import { AframeMapService } from "../../../aframe/aframe-map.service";
import { AFrameComponentsHub } from "../../../aframe/components/aframe-components-hub";


const factory = (
    aframeComponentsHub: AFrameComponentsHub,
    aframeSceneService: AframeSceneService,
    aframeMapService: AframeMapService,
    buildingsManagerService: BuildingsManagerService,
    unitsManagerService: UnitsManagerService,
    timeFrameService: GameLogicClockService,
    gameLogicActionsManager: GameLogicActionsManager,
) => {
    return new VrModeGameEngineService(
        aframeComponentsHub,
        aframeSceneService,
        aframeMapService,
        buildingsManagerService,
        unitsManagerService,
        timeFrameService,
        gameLogicActionsManager,
    );
};

export const provider = {
    provide: VrModeGameEngineService,
    useFactory: factory,
    deps: [
        AFrameComponentsHub,
        AframeSceneService,
        AframeMapService,
        BuildingsManagerService,
        UnitsManagerService,
        GameLogicClockService,
        GameLogicActionsManager,
    ]
};
