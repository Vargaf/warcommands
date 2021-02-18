import { DropType } from './drop-type.enum';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';

export interface CommandWrapperDTO {
    containerId: string;
    previousContainerId?: string;
    command: GenericCommandDTO | null;
    previousIndex: number;
    currentIndex: number;
    dropType?: DropType;
}
