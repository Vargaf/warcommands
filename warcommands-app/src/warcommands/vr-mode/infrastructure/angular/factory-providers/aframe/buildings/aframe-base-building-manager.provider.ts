import { AframeSceneService } from "src/warcommands/vr-mode/infrastructure/aframe/aframe-scene.service";
import { AframeBaseBuildingManagerService } from "src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-base-building-manager.service";


const factory = (
    sceneService: AframeSceneService,
) => {
    return new AframeBaseBuildingManagerService(
        sceneService,
    );
};

export const provider = {
    provide: AframeBaseBuildingManagerService,
    useFactory: factory,
    deps: [
        AframeSceneService,
    ]
};
