import { BuildingCreatedEventFactoryService } from 'src/warcommands/gameEngine/domain/building/services/building-created-event-factory.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';

const factory = (
    gameEventBusService: GameEventBusService
) => {
    return new BuildingCreatedEventFactoryService(
        gameEventBusService
    );
};

export const provider = {
    provide: BuildingCreatedEventFactoryService,
    useFactory: factory,
    deps: [
        GameEventBusService
    ]
};