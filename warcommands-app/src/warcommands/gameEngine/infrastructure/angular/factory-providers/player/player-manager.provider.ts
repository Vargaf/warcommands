import { PlayerManagerService } from 'src/warcommands/gameEngine/domain/player/services/player-manager.service';
import { InMemoryPlayerRepositoryService } from '../../../memory-repository/player/in-memory-player-repository.service';

const factory = (
    playerRepositoryService: InMemoryPlayerRepositoryService
) => {
    return new PlayerManagerService(playerRepositoryService);
};

export const provider = {
    provide: PlayerManagerService,
    useFactory: factory,
    deps: [
        InMemoryPlayerRepositoryService
    ]
};
