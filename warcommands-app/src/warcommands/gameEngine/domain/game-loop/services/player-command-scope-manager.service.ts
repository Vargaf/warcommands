import { PlayerCommandsScopeRepositoryService } from './player-commands-scope-repository.service';
import { PlayerCommandScopeDTO } from '../model/player-command-scope.dto';
import { PlayerCommandScopeVarValueRepositoryService } from './player-comand-scope-var-value-repository.service';
import { PlayerCommandScopeVarValueDTO } from '../model/player-command-scope-var-value.dto';

export class PlayerCommandsScopeManagerService {

    constructor(
        private readonly playerCommandsScopeRepository: PlayerCommandsScopeRepositoryService,
        private readonly playerCommandScopeVarValueRepositoryService: PlayerCommandScopeVarValueRepositoryService
    ) {}

    clearPlayerScope(playerId: string) {
        this.playerCommandsScopeRepository.clearPlayerScope(playerId);
    }

    saveScope(scope: PlayerCommandScopeDTO): void {
        this.playerCommandsScopeRepository.save(scope);
    }

    removePlayerScope(scope: PlayerCommandScopeDTO): void {
        this.playerCommandsScopeRepository.removeScope(scope);
    }

    addPlayerCommandScopeVarValue(varValue: PlayerCommandScopeVarValueDTO): void {
        this.playerCommandScopeVarValueRepositoryService.save(varValue);

        const scope: PlayerCommandScopeDTO = this.playerCommandsScopeRepository.findScopeByPlayerId(varValue.commandContainerId, varValue.playerId);
        scope.commands.push(varValue.commandId);
        this.playerCommandsScopeRepository.save(scope);
    }



}