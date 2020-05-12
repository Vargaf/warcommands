import { CommandType } from './command-type.enum';
import { CommandDTO } from './command.dto';

export interface SetVariableFromCommandCommandDTO extends CommandDTO {
    type: CommandType.SetVariableFromCommand;
    data: {
        varName: string;
    };
}
