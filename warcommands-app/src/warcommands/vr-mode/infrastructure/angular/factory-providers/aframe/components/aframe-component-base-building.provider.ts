import { AFrameComponentBaseBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-base-building";
import { AframeGtlfModelLoader } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-gtlf-model-loader.service";

const factory = (
    modelLoader: AframeGtlfModelLoader
) => {
    return new AFrameComponentBaseBuilding(
        modelLoader
    );
};

export const provider = {
    provide: AFrameComponentBaseBuilding,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader
    ]
};
