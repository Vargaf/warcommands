import { AframeSceneService } from "../../../aframe/aframe-scene.service";

const factory = () => {
    return new AframeSceneService();
};

export const provider = {
    provide: AframeSceneService,
    useFactory: factory,
    deps: []
};
