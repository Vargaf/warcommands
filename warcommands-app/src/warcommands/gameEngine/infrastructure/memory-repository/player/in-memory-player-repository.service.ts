import { PlayerRepositoryService } from 'src/warcommands/gameEngine/domain/player/services/player-repository.service';
import { PlayerDTO } from 'src/warcommands/gameEngine/domain/player/model/player.dto';

interface PlayerList {
    [id: string]: PlayerDTO;
}

export class InMemoryPlayerRepositoryService implements PlayerRepositoryService {

    private playerList: PlayerList = {};

    save(player: PlayerDTO): void {
        this.playerList[player.id] = { ...player };
    }

    findById(playerId: string): PlayerDTO {
        return { ...this.playerList[playerId] };
    }

    countPlayers(): number {
        return Object.keys(this.playerList).length;
    }

    getPlayerList(): PlayerDTO[] {
        return [ ...Object.values(this.playerList) ];
    }

}