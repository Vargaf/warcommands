import { CommandInterface } from './command.interface';
import { CommandType } from './command-type.enum';

export interface IfThenElseCommandEntity extends CommandInterface {
    type: CommandType.IfThenElse;
    thenCommandContainerId: string;
    elseCommandContainerId: string;
}
