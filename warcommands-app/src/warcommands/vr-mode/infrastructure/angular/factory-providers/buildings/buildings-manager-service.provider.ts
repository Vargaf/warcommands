import { BaseBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/base-building-manager.service";
import { BuildingsManagerService } from "src/warcommands/vr-mode/domain/buildings/service/buildings-manager-service";
import { AframeSceneObjectLoaderService } from "../../../aframe/aframe-scene-object-loader.service";
import { AframeGtlfModelLoader } from "../../../aframe/game-engine/aframe-gtlf-model-loader.service";


const factory = (
    modelLoader: AframeGtlfModelLoader,
    sceneObjectLoader: AframeSceneObjectLoaderService,
    baseBuildingManager: BaseBuildingManagerService
) => {
    return new BuildingsManagerService(
        modelLoader,
        sceneObjectLoader,
        baseBuildingManager,
    );
};

export const provider = {
    provide: BuildingsManagerService,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader,
        AframeSceneObjectLoaderService,
        BaseBuildingManagerService
    ]
};
