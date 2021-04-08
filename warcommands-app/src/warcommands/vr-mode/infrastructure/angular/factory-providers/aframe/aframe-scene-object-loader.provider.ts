import { RendererFactory2 } from "@angular/core";
import { AframeSceneObjectLoaderService } from "../../../aframe/aframe-scene-object-loader.service";
import { AframeSceneService } from "../../../aframe/aframe-scene.service";

const factory = (
    sceneService: AframeSceneService,
    rendererFactory: RendererFactory2
) => {
    return new AframeSceneObjectLoaderService(
        sceneService,
        rendererFactory,
    );
};

export const provider = {
    provide: AframeSceneObjectLoaderService,
    useFactory: factory,
    deps: [
        AframeSceneService,
        RendererFactory2
    ]
};
