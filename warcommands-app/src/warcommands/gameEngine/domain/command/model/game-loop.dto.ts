import { CommandDTO } from './command.dto';
import { CommandType } from './command-type.enum';

export interface GameLoopCommandDTO extends CommandDTO {
    type: CommandType.GameLoop;
    innerCommandContainerIdList: {
        commandContainerId: string
    };
}