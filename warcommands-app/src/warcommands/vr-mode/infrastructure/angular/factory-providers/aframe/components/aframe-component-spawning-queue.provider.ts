import { AFrameComponentSpawningQueue } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-spawning-queue";

const factory = () => {
    return new AFrameComponentSpawningQueue();
};

export const provider = {
    provide: AFrameComponentSpawningQueue,
    useFactory: factory,
    deps: []
};
