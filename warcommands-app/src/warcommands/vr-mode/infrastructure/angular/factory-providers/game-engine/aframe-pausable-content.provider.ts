import { AFramePausableContentService } from "../../../aframe/game-engine/aframe-pausable-content.service";
import { AFrameComponentPausableContent } from "../../../aframe/components/aframe-component-pausable-content";


const factory = (
    pausableContentComponent: AFrameComponentPausableContent,
) => {
    return new AFramePausableContentService(
        pausableContentComponent
    );
};

export const provider = {
    provide: AFramePausableContentService,
    useFactory: factory,
    deps: [
        AFrameComponentPausableContent
    ]
};
