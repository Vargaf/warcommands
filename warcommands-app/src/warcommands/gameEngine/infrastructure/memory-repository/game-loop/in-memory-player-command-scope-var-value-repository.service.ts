import { PlayerCommandScopeVarValueRepositoryService } from 'src/warcommands/gameEngine/domain/game-loop/services/player-comand-scope-var-value-repository.service';
import { PlayerCommandScopeVarValueDTO } from 'src/warcommands/gameEngine/domain/game-loop/model/player-command-scope-var-value.dto';
import * as _ from 'lodash';

export class InMemoryPlayerCommandScopeVarValueRepositoryService implements PlayerCommandScopeVarValueRepositoryService {
    
    private varValueList: Map<string, Map<string, PlayerCommandScopeVarValueDTO>> = new Map<string, Map<string, PlayerCommandScopeVarValueDTO>>();

    save(varValue: PlayerCommandScopeVarValueDTO): void {
        const clone = _.cloneDeep(varValue);
        this.varValueList.set(clone.playerId, (new Map).set(clone.commandId, clone));
    }

    findVarValueByPlayerId(commandId: string, playerId: string): PlayerCommandScopeVarValueDTO {
        return _.cloneDeep(this.varValueList.get(playerId).get(commandId));
    }

    removeVarValue(varValue: PlayerCommandScopeVarValueDTO): void {
        this.varValueList.get(varValue.playerId).delete(varValue.commandId);
    }

    clearPlayerVarValues(playerId: string): void {
        this.varValueList.delete(playerId);
    }
    
}