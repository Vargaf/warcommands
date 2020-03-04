import { CommandType } from 'src/warcommands/commands-panel/domain/command/model/command-type.enum';

export const userFileListIndex = 'user-files';

export interface UserFileDTO {
    id: string;
    isOppenedOnCommandPanel: boolean;
    name: string;
}

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
    isMain: boolean;
    commandContainer: CommandContainerJsonDTO;
}

