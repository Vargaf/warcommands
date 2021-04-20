import { AframeBaseBuildingManagerService } from "src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-base-building-manager.service";
import { AFramePausableContentService } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-pausable-content.service";


const factory = (
    pausableContentService: AFramePausableContentService,
) => {
    return new AframeBaseBuildingManagerService(
        pausableContentService,
    );
};

export const provider = {
    provide: AframeBaseBuildingManagerService,
    useFactory: factory,
    deps: [
        AFramePausableContentService,
    ]
};
