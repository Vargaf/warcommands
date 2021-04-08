import { AFrameComponentBaseBuilding } from "./aframe-component-base-building";

export class AFrameComponentsHub {

    constructor(
        private readonly baseBuildingComponent: AFrameComponentBaseBuilding
    ) {}

    initialize(): void {
        // only to avoid the unsused class on declaration
    }

}