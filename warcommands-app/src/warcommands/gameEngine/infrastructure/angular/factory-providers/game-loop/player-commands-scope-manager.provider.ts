import { PlayerCommandsScopeManagerService } from 'src/warcommands/gameEngine/domain/game-loop/services/player-command-scope-manager.service';
import { PlayerCommandsScopeRepositoryService } from 'src/warcommands/gameEngine/domain/game-loop/services/player-commands-scope-repository.service';
import { InMemoryPlayerCommandsScopeRepositoryService } from '../../../memory-repository/game-loop/in-memory-player-command-scope-repository.service';
import { PlayerCommandScopeVarValueRepositoryService } from 'src/warcommands/gameEngine/domain/game-loop/services/player-comand-scope-var-value-repository.service';
import { InMemoryPlayerCommandScopeVarValueRepositoryService } from '../../../memory-repository/game-loop/in-memory-player-command-scope-var-value-repository.service';

const factory = (
    playerCommandsScopeRepository: PlayerCommandsScopeRepositoryService,
    playerCommandScopeVarValueRepositoryService: PlayerCommandScopeVarValueRepositoryService
) => {
    return new PlayerCommandsScopeManagerService(
        playerCommandsScopeRepository,
        playerCommandScopeVarValueRepositoryService
    );
};

export const provider = {
    provide: PlayerCommandsScopeManagerService,
    useFactory: factory,
    deps: [
        InMemoryPlayerCommandsScopeRepositoryService,
        InMemoryPlayerCommandScopeVarValueRepositoryService
    ]
};