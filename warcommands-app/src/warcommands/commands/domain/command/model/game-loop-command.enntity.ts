import { CommandInterface } from './command.interface';
import { CommandType } from './command-type.enum';

export interface GameLoopCommandEntity extends CommandInterface {
    type: CommandType.GameLoop;
    innerCommandContainerIdList: {
        commandContainerId: string
    };
}
