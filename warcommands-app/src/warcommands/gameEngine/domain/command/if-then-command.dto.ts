import { CommandDTO } from './model/command.dto';
import { CommandType } from './model/command-type.enum';

export interface IfThenCommandEntity extends CommandDTO {
    type: CommandType.IfThen;
    innerCommandContainerIdList: {
        conditionCommandContainerId: string,
        thenCommandContainerId: string
    };
}