import { PlayerFilterDTO } from "../model/player-filter.dto";
import { PlayerDTO } from "../model/player.dto";

export abstract class PlayerRepositoryService {
    
    abstract save(player: PlayerDTO): void;

    abstract findBy(filter: PlayerFilterDTO): PlayerDTO[];

    abstract findCurrentPlayer(): PlayerDTO;

}