import { GameLogicEventsListenerService } from '../events/game-logic-events-listener.service';
import { BuildingsManagerEventListenersService } from '../../building/events/buildings-manager-event-listeneres.service';

export class GameEngineEventListenerHubService {

    constructor(
        private readonly gameLogicEventsListenerService: GameLogicEventsListenerService,
        private readonly buildingsManagereventListenersService: BuildingsManagerEventListenersService
    ) {}

}