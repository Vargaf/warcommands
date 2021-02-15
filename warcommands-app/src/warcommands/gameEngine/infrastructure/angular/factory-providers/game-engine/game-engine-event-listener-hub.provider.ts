import { GameEngineEventListenerHubService } from 'src/warcommands/gameEngine/domain/game-engine/sevices/game-engine-event-listener-hub.service';
import { BuildingsManagerEventListenersService } from 'src/warcommands/gameEngine/domain/building/events/buildings-manager-event-listeneres.service';

const factory = (
    buildingsManagereventListenersService: BuildingsManagerEventListenersService
) => {
    return new GameEngineEventListenerHubService(
        buildingsManagereventListenersService
    );
};

export const provider = {
    provide: GameEngineEventListenerHubService,
    useFactory: factory,
    deps: [
        BuildingsManagerEventListenersService
    ]
};
