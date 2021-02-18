import { PlayerType } from './player-type.enum';
import { DifficultyLevel } from './difficulty-level.enum';

export interface PlayerDTO {
    id: string;
    gameLoopCommandId?: string;
    type: PlayerType;
    difficultyLevel?: DifficultyLevel;
}