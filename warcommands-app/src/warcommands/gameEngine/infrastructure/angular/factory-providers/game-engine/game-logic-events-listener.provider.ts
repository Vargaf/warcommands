import { GameLogicEventsListenerService } from 'src/warcommands/gameEngine/domain/game-engine/events/game-logic-events-listener.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { UnitsToCreateRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-to-create-repository.service';
import { InMemoryUnitsToCreateRepositoryService } from '../../../memory-repository/unit/in-memory-units-to-create-repository.service';

const factory = (
    gameEventBusService: GameEventBusService,
    unitsToCreateRepositoryService: UnitsToCreateRepositoryService,
) => {
    return new GameLogicEventsListenerService(
        gameEventBusService,
        unitsToCreateRepositoryService,
    );
};

export const provider = {
    provide: GameLogicEventsListenerService,
    useFactory: factory,
    deps: [
        GameEventBusService,
        InMemoryUnitsToCreateRepositoryService
    ]
};
