import { GameLogicEventsListenerService } from '../events/game-logic-events-listener.service';

export class GameEngineEventListenerHubService {

    constructor(
        private readonly gameLogicEventsListenerService: GameLogicEventsListenerService
    ) {}

}