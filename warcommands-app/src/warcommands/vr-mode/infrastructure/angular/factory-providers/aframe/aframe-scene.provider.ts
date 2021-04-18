import { AFrameStatsService } from "../../../aframe/a-frame-stats.service";
import { AframeSceneService } from "../../../aframe/aframe-scene.service";

const factory = (
    aframeStatsService: AFrameStatsService
) => {
    return new AframeSceneService(
        aframeStatsService
    );
};

export const provider = {
    provide: AframeSceneService,
    useFactory: factory,
    deps: [
        AFrameStatsService
    ]
};
