import { GameLogicEventsListenerService } from 'src/warcommands/gameEngine/domain/game-engine/events/game-logic-events-listener.service';
import { GameLogicService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-logic.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { UnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/units/services/units-manager.service';

const factory = (
    gameLogicService: GameLogicService,
    gameEventBusService: GameEventBusService,
    unitsManagerService: UnitsManagerService
) => {
    return new GameLogicEventsListenerService(
        gameLogicService,
        gameEventBusService,
        unitsManagerService
    );
};

export const provider = {
    provide: GameLogicEventsListenerService,
    useFactory: factory,
    deps: [
        GameLogicService,
        GameEventBusService,
        UnitsManagerService
    ]
};
