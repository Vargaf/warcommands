import { GameClassService } from 'src/warcommands/gameEngine/domain/player-commands/game-class/services/game-class.service';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/build/in-memory-buildings-repository.service';
import { UnitsRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-repository.service';
import { InMemoryUnitsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/unit/in-memory-units-repository-service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';

const factory = (
    buildingsRepositoryService: BuildingsRepositoryService,
    unitsRepositoryService: UnitsRepositoryService,
    ) => {
    return new GameClassService(
        buildingsRepositoryService,
        unitsRepositoryService
        );
};

export const provider = {
    provide: GameClassService,
    useFactory: factory,
    deps: [
        InMemoryBuildingsRepositoryService,
        InMemoryUnitsRepositoryService
    ]
};
