import { BuildingsManagerEventListenersService } from '../../building/events/buildings-manager-event-listeneres.service';

export class GameEngineEventListenerHubService {

    constructor(
        private readonly buildingsManagereventListenersService: BuildingsManagerEventListenersService
    ) {}

}