import { AFrameComponentMatterFarmBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-matter-farm-building";
import { AframeGtlfModelLoader } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-gtlf-model-loader.service";

const factory = (
    modelLoader: AframeGtlfModelLoader,
) => {
    return new AFrameComponentMatterFarmBuilding(
        modelLoader,
    );
};

export const provider = {
    provide: AFrameComponentMatterFarmBuilding,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader,
    ]
};
