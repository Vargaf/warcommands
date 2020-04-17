import { GameEngineEventListenerHubService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-engine-event-listener-hub.service';
import { GameLogicEventsListenerService } from 'src/warcommands/gameEngine/domain/game-engine/events/game-logic-events-listener.service';
import { BuildingsManagerEventListenersService } from 'src/warcommands/gameEngine/domain/building/events/buildings-manager-event-listeneres.service';

const factory = (
    gameLogicEventsListenerService: GameLogicEventsListenerService,
    buildingsManagereventListenersService: BuildingsManagerEventListenersService
) => {
    return new GameEngineEventListenerHubService(
        gameLogicEventsListenerService,
        buildingsManagereventListenersService
    );
};

export const provider = {
    provide: GameEngineEventListenerHubService,
    useFactory: factory,
    deps: [
        GameLogicEventsListenerService,
        BuildingsManagerEventListenersService
    ]
};
