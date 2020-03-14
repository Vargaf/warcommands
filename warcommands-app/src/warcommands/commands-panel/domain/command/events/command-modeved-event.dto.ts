import { GenericCommandDTO } from '../model/generic-command.dto';

export interface CommandMovedEventDTO {
    fromContainerId: string;
    toContainerId: string;
    fromPosition: number;
    toPosition: number;
    command: GenericCommandDTO;
}
