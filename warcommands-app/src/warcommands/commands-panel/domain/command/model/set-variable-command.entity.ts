import { CommandType } from './command-type.enum';
import { GenericCommandDTO } from './generic-command.dto';

export interface SetVariableCommandEntity extends GenericCommandDTO {
    type: CommandType.SetVariable;
}
