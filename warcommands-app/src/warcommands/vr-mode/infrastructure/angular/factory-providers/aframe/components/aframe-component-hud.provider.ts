import { UxUiNgrxRepositoryService } from "src/warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service";
import { BuildingsNgrxRepositoryService } from "src/warcommands/game-middleware/buildings-ngrx-repository.service";
import { BuildingsRepositoryInterface } from "src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface";
import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import { AframeSceneService } from "src/warcommands/vr-mode/infrastructure/aframe/aframe-scene.service";
import { AFrameComponentHud } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-hud";


const factory = (
    uxUiNgrxRepository: UxUiNgrxRepositoryService,
    buildingsNgrxReposioryService: BuildingsNgrxRepositoryService,
    aframeSceneService: AframeSceneService,
    playerRepository: PlayerRepositoryService,
    buildingsRepository: BuildingsRepositoryInterface,
) => {
    return new AFrameComponentHud(
        uxUiNgrxRepository,
        buildingsNgrxReposioryService,
        aframeSceneService,
        playerRepository,
        buildingsRepository,
    );
};

export const provider = {
    provide: AFrameComponentHud,
    useFactory: factory,
    deps: [
        UxUiNgrxRepositoryService,
        BuildingsNgrxRepositoryService,
        AframeSceneService,
        PlayerRepositoryService,
        BuildingsRepositoryInterface
    ]
};
