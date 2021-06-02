import { AFrameComponentBaseBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-base-building";
import { AFrameComponentCamera } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-camera";
import { AFrameComponentClock } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-clock";
import { AFrameComponentEnergyFarmBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-energy-farm-building";
import { AFrameComponentHud } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-hud";
import { AFrameComponentMatterFarmBuilding } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-matter-farm-building";
import { AFrameComponentPausableContent } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-pausable-content";
import { AFrameComponentPlayerColor } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-player-color";
import { AFrameComponentSpawningQueue } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-spawning-queue";
import { AFrameComponentSpawningUnit } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-spawning-unit";
import { AFrameComponentWorkerUnit } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-worker-unit";
import { AFrameComponentsHub } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-components-hub";

const factory = (
    baseBuildingComponent: AFrameComponentBaseBuilding,
    matterFarmBuildingComponent: AFrameComponentMatterFarmBuilding,
    energyFarmBuildingComponent: AFrameComponentEnergyFarmBuilding,
    pausableContentComponent: AFrameComponentPausableContent,
    workerUnitComponent: AFrameComponentWorkerUnit,
    gameClockService: AFrameComponentClock,
    cameraComponent: AFrameComponentCamera,
    hudComponent: AFrameComponentHud,
    playerColorComponent: AFrameComponentPlayerColor,
    spawningUnitComponent: AFrameComponentSpawningUnit,
    spawningQueueComponent: AFrameComponentSpawningQueue
) => {
    return new AFrameComponentsHub(
        baseBuildingComponent,
        matterFarmBuildingComponent,
        energyFarmBuildingComponent,
        pausableContentComponent,
        workerUnitComponent,
        gameClockService,
        cameraComponent,
        hudComponent,
        playerColorComponent,
        spawningUnitComponent,
        spawningQueueComponent,
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
        AFrameComponentWorkerUnit,
        AFrameComponentClock,
        AFrameComponentCamera,
        AFrameComponentHud,
        AFrameComponentPlayerColor,
        AFrameComponentSpawningUnit,
        AFrameComponentSpawningQueue,
    ]
};
