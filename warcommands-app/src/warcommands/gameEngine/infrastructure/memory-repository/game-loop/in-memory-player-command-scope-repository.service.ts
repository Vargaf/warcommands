import { PlayerCommandScopeDTO } from 'src/warcommands/gameEngine/domain/game-loop/model/player-command-scope.dto';
import { PlayerCommandsScopeRepositoryService } from 'src/warcommands/gameEngine/domain/game-loop/services/player-commands-scope-repository.service';
import * as _ from 'lodash';
import { PlayerCommandScopeVarValueDTO } from 'src/warcommands/gameEngine/domain/game-loop/model/player-command-scope-var-value.dto';

export class InMemoryPlayerCommandsScopeRepositoryService implements PlayerCommandsScopeRepositoryService {
    
    private scopeList: Map<string, Map<string, PlayerCommandScopeDTO>> = new Map<string, Map<string, PlayerCommandScopeDTO>>();
    
    save(scope: PlayerCommandScopeDTO): void {
        const clone = _.cloneDeep(scope);

        if (!this.scopeList.has(clone.playerId)) {
            this.scopeList.set(clone.playerId, (new Map).set(clone.scopeId, clone));
        } else {
            this.scopeList.get(clone.playerId).set(clone.scopeId, clone);
        }
    }

    findScopeByPlayerId(scopeId: string, playerId: string): PlayerCommandScopeDTO {
        return _.cloneDeep(this.scopeList.get(playerId).get(scopeId));
    }

    addPlayerCommandScopeVarValue(varValue: PlayerCommandScopeVarValueDTO): void {
        const scope: PlayerCommandScopeDTO = this.findScopeByPlayerId(varValue.commandContainerId, varValue.playerId);
        scope.commands.push(varValue.commandId);
        this.save(scope);
    }

    removeScope(scope: PlayerCommandScopeDTO): void {
        this.scopeList.get(scope.playerId).delete(scope.scopeId);
    }

    clearPlayerScope(playerId: string): void {
        this.scopeList.delete(playerId);
    }
    
}