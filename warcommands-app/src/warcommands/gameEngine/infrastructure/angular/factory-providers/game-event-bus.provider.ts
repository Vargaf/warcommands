import { GameEventBusService } from "src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service";

const factory = () => {
    return new GameEventBusService();
};

export const provider = {
    provide: GameEventBusService,
    useFactory: factory,
    deps: []
};