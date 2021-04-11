import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { AFrameComponentEnergyFarmBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-energy-farm-building";
import { AframeGtlfModelLoader } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-gtlf-model-loader.service";

const factory = (
    modelLoader: AframeGtlfModelLoader,
    playerRepository: PlayerRepositoryService,
) => {
    return new AFrameComponentEnergyFarmBuilding(
        modelLoader,
        playerRepository,
    );
};

export const provider = {
    provide: AFrameComponentEnergyFarmBuilding,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader,
        PlayerRepositoryService,
    ]
};
