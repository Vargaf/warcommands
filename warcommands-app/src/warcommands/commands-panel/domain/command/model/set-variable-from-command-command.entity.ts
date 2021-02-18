import { CommandType } from './command-type.enum';
import { ClassNameENUM } from './class-definition/class-name.enum';
import { BaseSetVariableCommandEntity } from './set-variable-command.entity';

export interface SetVariableFromCommandCommandEntity extends BaseSetVariableCommandEntity {
    type: CommandType.SetVariableFromCommand;
    data: {
        varName: string;
        innerCommandId: string | null;
        className: ClassNameENUM | null;
    }
    innerCommandContainerIdList: {
        command: string
    };
}
