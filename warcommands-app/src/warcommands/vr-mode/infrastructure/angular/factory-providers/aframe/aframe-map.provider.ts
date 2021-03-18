import { NgZone } from "@angular/core";
import { ModelLoaderInterfaceService } from "src/warcommands/vr-mode/domain/game-engine/model-loader-abstract.service";
import { AframeMapService } from "../../../aframe/aframe-map.service";
import { AframeSceneService } from "../../../aframe/aframe-scene.service";
import { AframeGtlfModelLoader } from "../../../aframe/game-engine/aframe-gtlf-model-loader.service";



const factory = (
    ngZone: NgZone,
    modelLoaderService: ModelLoaderInterfaceService,
    aframeSceneService: AframeSceneService,
) => {
    return new AframeMapService(
        ngZone,
        modelLoaderService,
        aframeSceneService
    );
};

export const provider = {
    provide: AframeMapService,
    useFactory: factory,
    deps: [
        NgZone,
        AframeGtlfModelLoader,
        AframeSceneService
    ]
};
