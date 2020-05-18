import { CommandDTO } from './command.dto';
import { CommandType } from './command-type.enum';

export interface VariableCommandDTO extends CommandDTO {
    type: CommandType.Variable;
    data: {
        variableCommandId: string
    }
}