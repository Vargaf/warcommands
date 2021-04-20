import { AFrameComponentBaseBuilding } from "./aframe-component-base-building";
import { AFrameComponentEnergyFarmBuilding } from "./aframe-component-energy-farm-building";
import { AFrameComponentMatterFarmBuilding } from "./aframe-component-matter-farm-building";
import { AFrameComponentPausableContent } from "./aframe-component-pausable-content";

export class AFrameComponentsHub {

    constructor(
        private readonly baseBuildingComponent: AFrameComponentBaseBuilding,
        private readonly matterFarmBuildingComponent: AFrameComponentMatterFarmBuilding,
        private readonly energyFarmBuildingComponent: AFrameComponentEnergyFarmBuilding,
        private readonly pausableContentComponent: AFrameComponentPausableContent,
    ) {}

    initialize(): void {
        // only to avoid the unsused class on declaration
    }

}