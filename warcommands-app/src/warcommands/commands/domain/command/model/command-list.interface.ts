import { CreateMinionCommandEntity } from './create-minion-command.entity';
import { GameLoopCommandEntity } from './game-loop-command.enntity';

export interface CommandListInterface {
    [id: string]: CreateMinionCommandEntity | GameLoopCommandEntity;
}
