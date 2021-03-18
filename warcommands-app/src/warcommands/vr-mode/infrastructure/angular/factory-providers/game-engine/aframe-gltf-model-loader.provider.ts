import { AframeGtlfModelLoader } from "../../../aframe/game-engine/aframe-gtlf-model-loader.service";
import { AframeSceneService } from "../../../aframe/aframe-scene.service";
import { RendererFactory2 } from "@angular/core";


const factory = (
    sceneService: AframeSceneService,
    renderer: RendererFactory2
) => {
    return new AframeGtlfModelLoader(
        sceneService,
        renderer
    );
};

export const provider = {
    provide: AframeGtlfModelLoader,
    useFactory: factory,
    deps: [
        AframeSceneService,
        RendererFactory2
    ]
};
