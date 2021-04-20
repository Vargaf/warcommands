import { AFrameStatsService } from "../../../aframe/a-frame-stats.service";
import { AframeSceneService } from "../../../aframe/aframe-scene.service";
import { AFramePausableContentService } from "../../../aframe/game-engine/aframe-pausable-content.service";

const factory = (
    aframeStatsService: AFrameStatsService,
    pausableContentService: AFramePausableContentService
) => {
    return new AframeSceneService(
        aframeStatsService,
        pausableContentService
    );
};

export const provider = {
    provide: AframeSceneService,
    useFactory: factory,
    deps: [
        AFrameStatsService,
        AFramePausableContentService,
    ]
};
