import { CommandType } from 'src/warcommands/commands-panel/domain/command/model/command-type.enum';

export const userFileListIndex = 'user-files';

export interface UserFileDTO {
    id: string;
    isOppenedOnCommandPanel: boolean;
    name: string;
}







