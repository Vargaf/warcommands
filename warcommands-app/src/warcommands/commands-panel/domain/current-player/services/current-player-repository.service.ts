import { CurrentPlayerDTO } from '../model/current-player.dto';

export abstract class CurrentPlayerRepositoryService {

    abstract save(player: CurrentPlayerDTO): void;

    abstract getPlayer(): CurrentPlayerDTO;

}