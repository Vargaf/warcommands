import { BuildingsRepositoryInterface } from "src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface";
import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { AframeSceneService } from "src/warcommands/vr-mode/infrastructure/aframe/aframe-scene.service";
import { AFrameComponentCamera } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-camera";


const factory = (
    playerRepository: PlayerRepositoryService,
    buildingsRepository: BuildingsRepositoryInterface,
    aframeSceneService: AframeSceneService,
) => {
    return new AFrameComponentCamera(
        playerRepository,
        buildingsRepository,
        aframeSceneService,
    );
};

export const provider = {
    provide: AFrameComponentCamera,
    useFactory: factory,
    deps: [
        PlayerRepositoryService,
        BuildingsRepositoryInterface,
        AframeSceneService
    ]
};
