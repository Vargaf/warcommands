import { PlayerCommandScopeVarValueDTO } from '../model/player-command-scope-var-value.dto';

export abstract class PlayerCommandScopeVarValueRepositoryService {

    abstract save(varValue: PlayerCommandScopeVarValueDTO): void;

    abstract findVarValueByPlayerId(commandId: string, playerId: string): PlayerCommandScopeVarValueDTO;

    abstract removeVarValue(varValue: PlayerCommandScopeVarValueDTO): void;

    abstract clearPlayerVarValues(playerId: string): void ;

}