import { AFrameComponentBaseBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-base-building";
import { AFrameComponentEnergyFarmBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-energy-farm-building";
import { AFrameComponentMatterFarmBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-matter-farm-building";
import { AFrameComponentPausableContent } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-pausable-content";
import { AFrameComponentsHub } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-components-hub";

const factory = (
    baseBuildingComponent: AFrameComponentBaseBuilding,
    matterFarmBuildingComponent: AFrameComponentMatterFarmBuilding,
    energyFarmBuildingComponent: AFrameComponentEnergyFarmBuilding,
    pausableContentComponent: AFrameComponentPausableContent,
) => {
    return new AFrameComponentsHub(
        baseBuildingComponent,
        matterFarmBuildingComponent,
        energyFarmBuildingComponent,
        pausableContentComponent
    );
};

export const provider = {
    provide: AFrameComponentsHub,
    useFactory: factory,
    deps: [
        AFrameComponentBaseBuilding,
        AFrameComponentMatterFarmBuilding,
        AFrameComponentEnergyFarmBuilding,
        AFrameComponentPausableContent,
    ]
};
