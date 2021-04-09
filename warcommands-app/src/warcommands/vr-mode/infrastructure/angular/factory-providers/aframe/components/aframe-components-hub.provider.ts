import { AFrameComponentBaseBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-base-building";
import { AFrameComponentMatterFarmBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-matter-farm-building";
import { AFrameComponentsHub } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-components-hub";

const factory = (
    baseBuildingComponent: AFrameComponentBaseBuilding,
    matterFarmBuildingComponent: AFrameComponentMatterFarmBuilding,
) => {
    return new AFrameComponentsHub(
        baseBuildingComponent,
        matterFarmBuildingComponent,
    );
};

export const provider = {
    provide: AFrameComponentsHub,
    useFactory: factory,
    deps: [
        AFrameComponentBaseBuilding,
        AFrameComponentMatterFarmBuilding,
    ]
};
