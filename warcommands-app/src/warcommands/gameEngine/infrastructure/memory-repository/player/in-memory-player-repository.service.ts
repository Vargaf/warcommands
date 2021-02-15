import { PlayerRepositoryService } from 'src/warcommands/gameEngine/domain/player/services/player-repository.service';
import { PlayerDTO } from 'src/warcommands/gameEngine/domain/player/model/player.dto';
import * as _ from 'lodash';

export class InMemoryPlayerRepositoryService implements PlayerRepositoryService {

    private playerList: Map<string, PlayerDTO> = new Map<string, PlayerDTO>();

    save(player: PlayerDTO): void {
        const clone = _.cloneDeep(player);
        this.playerList.set(clone.id, clone);
    }

    findById(playerId: string): PlayerDTO {
        const player = this.playerList.get(playerId);
        return <PlayerDTO>_.cloneDeep(player);
    }

    countPlayers(): number {
        return this.playerList.size;
    }

    getPlayerList(): PlayerDTO[] {
        const list: PlayerDTO[] = [];
        for (const player of this.playerList.values()) {
            list.push(player);
        }
        return _.cloneDeep(list);
    }

}