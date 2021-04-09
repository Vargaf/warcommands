import { BaseBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/base-building-manager.service";
import { BuildingsManagerService } from "src/warcommands/vr-mode/domain/buildings/service/buildings-manager-service";
import { BuildingsRepositoryInterface } from "src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface";
import { AframeSceneObjectLoaderService } from "../../../aframe/aframe-scene-object-loader.service";
import { AframeGtlfModelLoader } from "../../../aframe/game-engine/aframe-gtlf-model-loader.service";


const factory = (
    modelLoader: AframeGtlfModelLoader,
    sceneObjectLoader: AframeSceneObjectLoaderService,
    baseBuildingManager: BaseBuildingManagerService,
    buildingsRepository: BuildingsRepositoryInterface,
) => {
    return new BuildingsManagerService(
        modelLoader,
        sceneObjectLoader,
        baseBuildingManager,
        buildingsRepository,
    );
};

export const provider = {
    provide: BuildingsManagerService,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader,
        AframeSceneObjectLoaderService,
        BaseBuildingManagerService,
        BuildingsRepositoryInterface,
    ]
};
