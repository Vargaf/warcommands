import { CommandType } from './command-type.enum';
import { CommandInterface } from './command.interface';

export interface SetVariableCommandEntity extends CommandInterface {
    type: CommandType.SetVariable;
}