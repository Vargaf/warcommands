import { PlayerCommandScopeDTO } from '../model/player-command-scope.dto';
import { PlayerCommandScopeVarValueDTO } from '../model/player-command-scope-var-value.dto';

export abstract class PlayerCommandsScopeRepositoryService {

    abstract save(scope: PlayerCommandScopeDTO): void;

    abstract findScopeByPlayerId(scopeId: string, playerId: string): PlayerCommandScopeDTO;

    abstract addPlayerCommandScopeVarValue(varValue: PlayerCommandScopeVarValueDTO): void;

    abstract removeScope(scope: PlayerCommandScopeDTO): void;

    abstract clearPlayerScope(playerId: string): void;

}