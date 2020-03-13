import { CommandType } from '../../command/model/command-type.enum';

export interface CommandJsonDTO {
    id: string;
    type: CommandType;
    data: any;
    commandContainerList: CommandContainerJsonDTO[];
}

export interface CommandContainerJsonDTO {
    id: string;
    commands: CommandJsonDTO[];
}

export interface FileJsonDTO {
    id: string;
    name: string;
    commandContainer: CommandContainerJsonDTO;
}
