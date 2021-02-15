import { GenericCommandDTO } from './generic-command.dto';

export interface CommandAddedEventDTO {
    command: GenericCommandDTO;
    position: number;
}
