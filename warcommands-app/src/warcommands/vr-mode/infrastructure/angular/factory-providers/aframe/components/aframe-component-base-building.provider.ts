import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { AFrameComponentBaseBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-base-building";
import { AframeGtlfModelLoader } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-gtlf-model-loader.service";

const factory = (
    modelLoader: AframeGtlfModelLoader,
    playerRepository: PlayerRepositoryService,
) => {
    return new AFrameComponentBaseBuilding(
        modelLoader,
        playerRepository,
    );
};

export const provider = {
    provide: AFrameComponentBaseBuilding,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader,
        PlayerRepositoryService,
    ]
};
