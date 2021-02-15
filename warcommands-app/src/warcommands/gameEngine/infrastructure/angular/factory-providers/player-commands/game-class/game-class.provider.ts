import { GameClassService } from 'src/warcommands/gameEngine/domain/player-commands/game-class/services/game-class.service';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/build/in-memory-buildings-repository.service';
import { BuildingsRepositoryService } from 'src/warcommands/gameEngine/domain/building/services/buildings-repository.service';

const factory = (
    buildingsRepositoryService: BuildingsRepositoryService,
    ) => {
    return new GameClassService(
        buildingsRepositoryService,
        );
};

export const provider = {
    provide: GameClassService,
    useFactory: factory,
    deps: [
        InMemoryBuildingsRepositoryService,
    ]
};
