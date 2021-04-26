import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";


const factory = () => {
    return new GameLogicClockService();
};

export const provider = {
    provide: GameLogicClockService,
    useFactory: factory,
    deps: []
};
