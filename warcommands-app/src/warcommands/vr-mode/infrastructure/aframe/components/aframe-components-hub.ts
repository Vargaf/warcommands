import { AFrameComponentBaseBuilding } from "./aframe-component-base-building";
import { AFrameComponentCamera } from "./aframe-component-camera";
import { AFrameComponentClock } from "./aframe-component-clock";
import { AFrameComponentEnergyFarmBuilding } from "./aframe-component-energy-farm-building";
import { AFrameComponentMatterFarmBuilding } from "./aframe-component-matter-farm-building";
import { AFrameComponentPausableContent } from "./aframe-component-pausable-content";
import { AFrameComponentWorkerUnit } from "./aframe-component-worker-unit";

export class AFrameComponentsHub {

    constructor(
        private readonly baseBuildingComponent: AFrameComponentBaseBuilding,
        private readonly matterFarmBuildingComponent: AFrameComponentMatterFarmBuilding,
        private readonly energyFarmBuildingComponent: AFrameComponentEnergyFarmBuilding,
        private readonly pausableContentComponent: AFrameComponentPausableContent,
        private readonly workerUnitComponent: AFrameComponentWorkerUnit,
        private readonly gameClockService: AFrameComponentClock,
        private readonly cameraComponent: AFrameComponentCamera,
    ) {}

    initialize(): void {
        // only to avoid the unsused class on declaration
    }

}