import { AframeEnergyFarmBuildingManagerService } from "src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-energy-farm-building-manager.service";
import { AFramePausableContentService } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-pausable-content.service";


const factory = (
    pausableContentService: AFramePausableContentService,
) => {
    return new AframeEnergyFarmBuildingManagerService(
        pausableContentService,
    );
};

export const provider = {
    provide: AframeEnergyFarmBuildingManagerService,
    useFactory: factory,
    deps: [
        AFramePausableContentService,
    ]
};
