import { GenericCommandDTO } from '../../command/model/generic-command.dto';

export interface CommandContainerDTO {
    id: string;
    fileId: string;
    commands: Array<GenericCommandDTO>;
}

export interface CommandContainerListDTO {
    [id: string]: CommandContainerDTO;
}
