import { BaseUnitsManagerService } from 'src/warcommands/gameEngine/domain/game-engine/units/services/base-units-manager.service';
import { InMemoryBuildingsRepositoryService } from '../../../memory-repository/build/in-memory-buildings-repository.service';
import { GameEventBusService } from 'src/warcommands/gameEngine/domain/game-event-bus/services/game-event-bus.service';

const factory = (
    buildingRepositoryService: InMemoryBuildingsRepositoryService,
    gameEventsBusService: GameEventBusService
) => {
    return new BaseUnitsManagerService(
        buildingRepositoryService,
        gameEventsBusService
    );
};

export const provider = {
    provide: BaseUnitsManagerService,
    useFactory: factory,
    deps: [
        InMemoryBuildingsRepositoryService,
        GameEventBusService
    ]
};
