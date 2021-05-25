import { BuildingsRepositoryInterface } from "src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface";
import { AFramePausableContentService } from "src/warcommands/vr-mode/infrastructure/aframe/game-engine/aframe-pausable-content.service";
import { AFrameWorkerUnitManagerService } from "src/warcommands/vr-mode/infrastructure/aframe/units/aframe-worker-unit-manager.service";


const factory = (
    pausableContentService: AFramePausableContentService,
    buildingsRepository: BuildingsRepositoryInterface,
) => {
    return new AFrameWorkerUnitManagerService(
        pausableContentService,
        buildingsRepository,
    );
};

export const provider = {
    provide: AFrameWorkerUnitManagerService,
    useFactory: factory,
    deps: [
        AFramePausableContentService,
        BuildingsRepositoryInterface,
    ]
};
