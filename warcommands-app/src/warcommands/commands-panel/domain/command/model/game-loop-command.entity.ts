import { CommandType } from './command-type.enum';
import { GenericCommandDTO } from './generic-command.dto';

export interface GameLoopCommandEntity extends GenericCommandDTO {
    type: CommandType.GameLoop;
    innerCommandContainerIdList: {
        commandContainerId: string
    };
}
