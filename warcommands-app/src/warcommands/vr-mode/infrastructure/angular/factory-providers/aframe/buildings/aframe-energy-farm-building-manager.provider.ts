import { AframeSceneService } from "src/warcommands/vr-mode/infrastructure/aframe/aframe-scene.service";
import { AframeEnergyFarmBuildingManagerService } from "src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-energy-farm-building-manager.service";


const factory = (
    sceneService: AframeSceneService,
) => {
    return new AframeEnergyFarmBuildingManagerService(
        sceneService,
    );
};

export const provider = {
    provide: AframeEnergyFarmBuildingManagerService,
    useFactory: factory,
    deps: [
        AframeSceneService,
    ]
};
