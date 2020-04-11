import { GameClassService } from 'src/warcommands/gameEngine/domain/player-commands/game-class/services/game-class.service';
import { InMemoryBuildingsRepositoryService } from 'src/warcommands/gameEngine/infrastructure/memory-repository/build/in-memory-buildings-repository.service';

const factory = (
    buildingsRepositoryService: InMemoryBuildingsRepositoryService
    ) => {
    return new GameClassService(buildingsRepositoryService);
};

export const provider = {
    provide: GameClassService,
    useFactory: factory,
    deps: [
        InMemoryBuildingsRepositoryService
    ]
};
