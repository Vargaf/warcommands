import { InMemoryPlayerCommandScopeVarValueRepositoryService } from '../../../memory-repository/game-loop/in-memory-player-command-scope-var-value-repository.service';

const factory = () => {
    return new InMemoryPlayerCommandScopeVarValueRepositoryService();
};

export const provider = {
    provide: InMemoryPlayerCommandScopeVarValueRepositoryService,
    useFactory: factory,
    deps: []
};