import { CommandType } from './command-type.enum';
import { GenericCommandDTO } from './generic-command.dto';
import { ClassNameENUM } from './class-definition/class-name.enum';

export interface BaseSetVariableCommandEntity extends GenericCommandDTO {
    data: {
        varName: string;
        className: ClassNameENUM;
        varValue?: string | number;
        innerCommandId?: string;
    }
}

export interface SetVariableCommandEntity extends BaseSetVariableCommandEntity {
    type: CommandType.SetVariable;
    data: {
        varName: string;
        varValue: string;
        className: ClassNameENUM;
    }
}
