import { CommandInterface } from '../../command/model/command.interface';

export interface CommandContainerDTO {
    id: string;
    pageId: string;
    commands: Array<CommandInterface>;
}

export interface CommandContainerListDTO {
    [id: string]: CommandContainerDTO;
}
