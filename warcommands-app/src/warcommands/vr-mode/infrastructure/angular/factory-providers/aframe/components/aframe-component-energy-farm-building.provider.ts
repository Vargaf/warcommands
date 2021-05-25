import { AFrameComponentEnergyFarmBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-energy-farm-building";
import { AframeGtlfModelLoader } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-gtlf-model-loader.service";

const factory = (
    modelLoader: AframeGtlfModelLoader,
) => {
    return new AFrameComponentEnergyFarmBuilding(
        modelLoader,
    );
};

export const provider = {
    provide: AFrameComponentEnergyFarmBuilding,
    useFactory: factory,
    deps: [
        AframeGtlfModelLoader,
    ]
};
