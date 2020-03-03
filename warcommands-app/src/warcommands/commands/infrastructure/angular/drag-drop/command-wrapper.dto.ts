import { CommandType } from 'src/warcommands/commands/domain/command/model/command-type.enum';
import { DropType } from './drop-type.enum';

export interface CommandWrapperDTO {
    containerId: string;
    previousContainerId?: string;
    fileId: string;
    itemId: string;
    previousIndex: number;
    currentIndex: number;
    commandType: CommandType;
    dropType?: DropType;
}
