import { CommandType } from './command-type.enum';
import { GenericCommandDTO } from './generic-command.dto';

export interface VariableCommandEntity extends GenericCommandDTO {
    type: CommandType.Variable;
}
