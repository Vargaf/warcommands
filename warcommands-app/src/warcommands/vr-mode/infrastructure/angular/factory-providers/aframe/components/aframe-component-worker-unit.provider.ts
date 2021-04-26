import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";
import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { AFrameComponentWorkerUnit } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-worker-unit";
import { AframeGtlfModelLoader } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-gtlf-model-loader.service";

const factory = (
    modelLoader: AframeGtlfModelLoader,
    playerRepository: PlayerRepositoryService,
    gameLogicClock: GameLogicClockService
) => {
    return new AFrameComponentWorkerUnit(
        modelLoader,
        playerRepository,
        gameLogicClock,
    );
};

export const provider = {
    provide: AFrameComponentWorkerUnit,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader,
        PlayerRepositoryService,
        GameLogicClockService,
    ]
};
