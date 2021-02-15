import { CommandType } from './command-type.enum';
import { CommandDTO } from './command.dto';

export interface SetVariableCommandDTO extends CommandDTO {
    type: CommandType.SetVariable;
    data: {
        varName: string;
        varValue: string;
    }
}
