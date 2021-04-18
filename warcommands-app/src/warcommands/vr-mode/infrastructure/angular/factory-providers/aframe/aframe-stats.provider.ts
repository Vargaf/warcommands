import { AFrameStatsService } from "../../../aframe/a-frame-stats.service";

const factory = () => {
    return new AFrameStatsService();
};

export const provider = {
    provide: AFrameStatsService,
    useFactory: factory,
    deps: []
};
