import { CommandInterface } from './command.interface';
import { CommandType } from './command-type.enum';

export interface IfThenCommandEntity extends CommandInterface {
    type: CommandType.IfThen;
    innerCommandContainerIdList: {
        thenCommandContainerId: string
    };
}
