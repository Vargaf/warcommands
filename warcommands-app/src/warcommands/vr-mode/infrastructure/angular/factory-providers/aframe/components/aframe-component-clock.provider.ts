import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";
import { AFrameComponentClock } from "src/warcommands/vr-mode/infrastructure/aframe/components/aframe-component-clock";

const factory = (
    gameClockService: GameLogicClockService
) => {
    return new AFrameComponentClock(
        gameClockService
    );
};

export const provider = {
    provide: AFrameComponentClock,
    useFactory: factory,
    deps: [
        GameLogicClockService
    ]
};
