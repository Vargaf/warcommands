import { BuildingsRepositoryInterface } from "src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface";
import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";
import { AFrameComponentWorkerUnit } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-worker-unit";
import { AframeGtlfModelLoader } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-gtlf-model-loader.service";

const factory = (
    modelLoader: AframeGtlfModelLoader,
    gameLogicClock: GameLogicClockService,
    buildingsRepository: BuildingsRepositoryInterface,
) => {
    return new AFrameComponentWorkerUnit(
        modelLoader,
        gameLogicClock,
        buildingsRepository,
    );
};

export const provider = {
    provide: AFrameComponentWorkerUnit,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader,
        GameLogicClockService,
        BuildingsRepositoryInterface,
    ]
};
