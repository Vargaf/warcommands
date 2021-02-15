import { PlayerDTO } from '../model/player.dto';

export abstract class PlayerRepositoryService {

    abstract save(player: PlayerDTO): void;

    abstract findById(playerId: string): PlayerDTO;

    abstract countPlayers(): number;

    abstract getPlayerList(): PlayerDTO[];

}