import { PlayerDTO } from '../model/player.dto';
import { PlayerType } from '../model/player-type.enum';
import { DifficultyLevel } from '../model/difficulty-level.enum';
import { v4 as uuid } from 'uuid';
import { PlayerRepositoryService } from './player-repository.service';

export class PlayerManagerService {

    constructor(
        private readonly playerRepositoryService: PlayerRepositoryService
    ) {}

    addPlayer(playerId: string): void {
        const player: PlayerDTO = {
            id: playerId,
            gameLoopCommandId: null,
            type: PlayerType.Player,
            difficultyLevel: null
        }

        this.playerRepositoryService.save(player);
    }

    addIAPlayer(difficultyLevel: DifficultyLevel): void {

        const player: PlayerDTO = {
            id: uuid(),
            gameLoopCommandId: null,
            type: PlayerType.IA,
            difficultyLevel
        }

        this.playerRepositoryService.save(player);
    }

    getNumberOfPlayers(): number {
        return this.playerRepositoryService.countPlayers();
    }

    getMirroringIAPlayers(): PlayerDTO[] {
        const playerList: PlayerDTO[] = this.playerRepositoryService.getPlayerList().filter((player) => {
            return player.type === PlayerType.IA && player.difficultyLevel === DifficultyLevel.Mirror;
        });

        return playerList;
    }

    addGameloopCommandToPlayer(playerId: string, gameLoopCommandId: string): void {
        const player: PlayerDTO = this.playerRepositoryService.findById(playerId);
        player.gameLoopCommandId = gameLoopCommandId;
        this.playerRepositoryService.save(player);
    }

    getPlayerList(): PlayerDTO[] {
        return this.playerRepositoryService.getPlayerList();
    }

}