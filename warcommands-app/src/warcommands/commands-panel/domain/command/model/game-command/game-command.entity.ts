import { GenericCommandDTO } from '../generic-command.dto';
import { CommandType } from '../command-type.enum';

export interface GameCommandEntity extends GenericCommandDTO {
    type: CommandType.Game;
}