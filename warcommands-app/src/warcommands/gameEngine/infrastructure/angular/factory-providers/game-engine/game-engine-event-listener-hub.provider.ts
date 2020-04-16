import { GameEngineEventListenerHubService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-engine-event-listener-hub.service';
import { GameLogicEventsListenerService } from 'src/warcommands/gameEngine/domain/game-engine/events/game-logic-events-listener.service';

const factory = (
    gameLogicEventsListenerService: GameLogicEventsListenerService
) => {
    return new GameEngineEventListenerHubService(
        gameLogicEventsListenerService
    );
};

export const provider = {
    provide: GameEngineEventListenerHubService,
    useFactory: factory,
    deps: [
        GameLogicEventsListenerService
    ]
};
