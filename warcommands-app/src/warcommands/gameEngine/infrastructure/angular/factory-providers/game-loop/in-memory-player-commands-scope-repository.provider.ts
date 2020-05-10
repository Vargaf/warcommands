import { InMemoryPlayerCommandsScopeRepositoryService } from '../../../memory-repository/game-loop/in-memory-player-command-scope-repository.service';

const factory = () => {
    return new InMemoryPlayerCommandsScopeRepositoryService();
};

export const provider = {
    provide: InMemoryPlayerCommandsScopeRepositoryService,
    useFactory: factory,
    deps: []
};