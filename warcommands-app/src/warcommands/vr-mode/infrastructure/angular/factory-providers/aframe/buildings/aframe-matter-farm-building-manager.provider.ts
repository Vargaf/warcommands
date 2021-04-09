import { AframeSceneService } from "src/warcommands/vr-mode/infrastructure/aframe/aframe-scene.service";
import { AframeMatterFarmBuildingManagerService } from "src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-matter-farm-building-manager.service";


const factory = (
    sceneService: AframeSceneService,
) => {
    return new AframeMatterFarmBuildingManagerService(
        sceneService,
    );
};

export const provider = {
    provide: AframeMatterFarmBuildingManagerService,
    useFactory: factory,
    deps: [
        AframeSceneService,
    ]
};
