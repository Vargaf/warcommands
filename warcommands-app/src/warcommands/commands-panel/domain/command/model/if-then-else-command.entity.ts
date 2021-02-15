import { CommandType } from './command-type.enum';
import { GenericCommandDTO } from './generic-command.dto';

export interface IfThenElseCommandEntity extends GenericCommandDTO {
    type: CommandType.IfThenElse;
    innerCommandContainerIdList: {
        thenCommandContainerId: string,
        elseCommandContainerId: string
    };
}
