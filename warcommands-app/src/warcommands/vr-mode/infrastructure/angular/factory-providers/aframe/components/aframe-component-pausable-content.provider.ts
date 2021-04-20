import { AFrameComponentPausableContent } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-pausable-content";

const factory = () => {
    return new AFrameComponentPausableContent();
};

export const provider = {
    provide: AFrameComponentPausableContent,
    useFactory: factory,
    deps: []
};
