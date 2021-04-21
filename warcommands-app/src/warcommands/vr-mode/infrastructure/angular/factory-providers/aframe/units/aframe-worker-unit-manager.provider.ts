import { AFramePausableContentService } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-pausable-content.service";
import { AFrameWorkerUnitManagerService } from "src/warcommands/vr-mode/infrastructure/aframe/units/aframe-worker-unit-manager.service";


const factory = (
    pausableContentService: AFramePausableContentService,
) => {
    return new AFrameWorkerUnitManagerService(
        pausableContentService,
    );
};

export const provider = {
    provide: AFrameWorkerUnitManagerService,
    useFactory: factory,
    deps: [
        AFramePausableContentService,
    ]
};
