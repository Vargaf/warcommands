import { VrModeGameEngineService } from "src/warcommands/vr-mode/domain/game-engine/vr-mode-game-engine.service";
import { AframeSceneService } from "src/warcommands/vr-mode/infrastructure/aframe/aframe-scene.service";
import { AframeMapService } from "../../../aframe/aframe-map.service";


const factory = (
    aframeSceneService: AframeSceneService,
    aframeMapService: AframeMapService,
) => {
    return new VrModeGameEngineService(
        aframeSceneService,
        aframeMapService,
    );
};

export const provider = {
    provide: VrModeGameEngineService,
    useFactory: factory,
    deps: [
        AframeSceneService,
        AframeMapService,
    ]
};
