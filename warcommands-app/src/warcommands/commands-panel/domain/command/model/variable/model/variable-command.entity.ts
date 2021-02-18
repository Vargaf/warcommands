import { GenericCommandDTO } from '../../generic-command.dto';
import { CommandType } from '../../command-type.enum';

export interface VariableCommandEntity extends GenericCommandDTO {
    type: CommandType.Variable;
    data: {
        variableCommandId: string | null
    }
}
