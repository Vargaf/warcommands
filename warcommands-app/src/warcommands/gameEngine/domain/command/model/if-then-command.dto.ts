import { CommandType } from './command-type.enum';
import { CommandDTO } from './command.dto';

export interface IfThenCommandDTO extends CommandDTO {
    type: CommandType.IfThen;
    innerCommandContainerIdList: {
        conditionCommandContainerId: string,
        thenCommandContainerId: string
    };
}
