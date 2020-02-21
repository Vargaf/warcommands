import { CommandInterface } from './command.interface';
import { CommandType } from './command-type.enum';

export interface VariableCommandEntity extends CommandInterface {
    type: CommandType.Variable;
}
