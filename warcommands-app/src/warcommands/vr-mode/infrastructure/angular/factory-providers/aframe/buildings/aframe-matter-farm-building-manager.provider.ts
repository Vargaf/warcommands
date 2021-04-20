import { AframeMatterFarmBuildingManagerService } from "src/warcommands/vr-mode/infrastructure/aframe/buildings/aframe-matter-farm-building-manager.service";
import { AFramePausableContentService } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-pausable-content.service";


const factory = (
    pausableContentService: AFramePausableContentService,
) => {
    return new AframeMatterFarmBuildingManagerService(
        pausableContentService,
    );
};

export const provider = {
    provide: AframeMatterFarmBuildingManagerService,
    useFactory: factory,
    deps: [
        AFramePausableContentService,
    ]
};
