import { BuildingsManagerService } from "src/warcommands/vr-mode/domain/buildings/service/buildings-manager-service";
import { VrModeGameEngineService } from "src/warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service";
import { AframeSceneService } from "src/warcommands/vr-mode/infrastructure/aframe/aframe-scene.service";
import { AframeMapService } from "../../../aframe/aframe-map.service";
import { AFrameComponentsHub } from "../../../aframe/components/aframe-components-hub";


const factory = (
    aframeComponentsHub: AFrameComponentsHub,
    aframeSceneService: AframeSceneService,
    aframeMapService: AframeMapService,
    buildingsManagerService: BuildingsManagerService
) => {
    return new VrModeGameEngineService(
        aframeComponentsHub,
        aframeSceneService,
        aframeMapService,
        buildingsManagerService,
    );
};

export const provider = {
    provide: VrModeGameEngineService,
    useFactory: factory,
    deps: [
        AFrameComponentsHub,
        AframeSceneService,
        AframeMapService,
        BuildingsManagerService
    ]
};
