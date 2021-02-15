import { GenericCommandDTO } from '../model/generic-command.dto';

export interface CommandAddedEventDTO {
    command: GenericCommandDTO;
    position: number;
}
