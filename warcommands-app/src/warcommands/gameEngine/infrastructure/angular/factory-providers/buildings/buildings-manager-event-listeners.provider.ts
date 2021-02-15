import { BuildingsManagerEventListenersService } from 'src/warcommands/gameEngine/domain/building/events/buildings-manager-event-listeneres.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';
import { BuildingsManagerService } from 'src/warcommands/gameEngine/domain/building/services/buildings-manager.service';

const factory = (
    gameEventBusService: GameEventBusService,
    buildingsManagerService: BuildingsManagerService
) => {
    return new BuildingsManagerEventListenersService(
        gameEventBusService,
        buildingsManagerService
        )
};

export const provider = {
    provide: BuildingsManagerEventListenersService,
    useFactory: factory,
    deps: [
        GameEventBusService,
        BuildingsManagerService
    ]
};
