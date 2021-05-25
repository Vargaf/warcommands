import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";
import { AFrameComponentBaseBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-base-building";
import { AframeGtlfModelLoader } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-gtlf-model-loader.service";

const factory = (
    modelLoader: AframeGtlfModelLoader,
    gameClockService: GameLogicClockService,
) => {
    return new AFrameComponentBaseBuilding(
        modelLoader,
        gameClockService,
    );
};

export const provider = {
    provide: AFrameComponentBaseBuilding,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader,
        GameLogicClockService,
    ]
};
