import { CommandType } from './command-type.enum';
import { GenericCommandDTO } from './generic-command.dto';

export interface IfThenCommandEntity extends GenericCommandDTO {
    type: CommandType.IfThen;
    innerCommandContainerIdList: {
        conditionCommandContainerId: string,
        thenCommandContainerId: string
    };
}
