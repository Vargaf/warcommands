import { AFrameComponentBaseBuilding } from "./aframe-component-base-building";
import { AFrameComponentMatterFarmBuilding } from "./aframe-component-matter-farm-building";

export class AFrameComponentsHub {

    constructor(
        private readonly baseBuildingComponent: AFrameComponentBaseBuilding,
        private readonly matterFarmBuildingComponent: AFrameComponentMatterFarmBuilding,
    ) {}

    initialize(): void {
        // only to avoid the unsused class on declaration
    }

}