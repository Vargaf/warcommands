import { CommandType } from './command-type.enum';
import { GenericCommandDTO } from './generic-command.dto';

export interface SetVariableFromCommandCommandEntity extends GenericCommandDTO {
    type: CommandType.SetVariableFromCommand;
    data: {
        varName: string;
    }
    innerCommandContainerIdList: {
        command: string
    };
}
