import { PlayerDTO } from '../model/player.dto';
import { PlayerType } from '../model/player-type.enum';
import { DifficultyLevel } from '../model/difficulty-level.enum';
import { v4 as uuid } from 'uuid';

export class PlayerManagerService {

    private playerList: PlayerDTO[] = [];

    constructor() {}

    addPlayer(playerId: string): void {
        const player: PlayerDTO = {
            id: playerId,
            gameLoopCommandId: null,
            type: PlayerType.Player,
            difficultyLevel: null
        }

        this.playerList.push(player);
    }

    addIAPlayer(difficultyLevel: DifficultyLevel): void {

        const player: PlayerDTO = {
            id: uuid(),
            gameLoopCommandId: null,
            type: PlayerType.Player,
            difficultyLevel
        }

        this.playerList.push(player);
    }

    getNumberOfPlayers(): number {
        return this.playerList.length;
    }

}