import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";
import { AFrameComponentSpawningUnit } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-spawning-unit";

const factory = (
    gameClockService: GameLogicClockService,
) => {
    return new AFrameComponentSpawningUnit(
        gameClockService,
    );
};

export const provider = {
    provide: AFrameComponentSpawningUnit,
    useFactory: factory,
    deps: [
        GameLogicClockService,
    ]
};
