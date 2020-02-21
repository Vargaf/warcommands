import { CommandInterface } from './command.interface';
import { CommandType } from './command-type.enum';

export interface CreateMinionCommandEntity extends CommandInterface {
    type: CommandType.CreateMinion;
}
