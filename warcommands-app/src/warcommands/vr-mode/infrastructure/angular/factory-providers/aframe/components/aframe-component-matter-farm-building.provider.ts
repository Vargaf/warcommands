import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { AFrameComponentMatterFarmBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-matter-farm-building";
import { AframeGtlfModelLoader } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-gtlf-model-loader.service";

const factory = (
    modelLoader: AframeGtlfModelLoader,
    playerRepository: PlayerRepositoryService,
) => {
    return new AFrameComponentMatterFarmBuilding(
        modelLoader,
        playerRepository,
    );
};

export const provider = {
    provide: AFrameComponentMatterFarmBuilding,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader,
        PlayerRepositoryService,
    ]
};
