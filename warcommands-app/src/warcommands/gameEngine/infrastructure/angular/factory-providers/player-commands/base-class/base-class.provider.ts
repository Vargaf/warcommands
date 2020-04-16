import { BaseClassService } from 'src/warcommands/gameEngine/domain/player-commands/base-class/services/base-class-service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';

const factory = (
    gameEventsBusService: GameEventBusService
) => {
    return new BaseClassService(
        gameEventsBusService
    );
};

export const provider = {
    provide: BaseClassService,
    useFactory: factory,
    deps: [
        GameEventBusService
    ]
};
