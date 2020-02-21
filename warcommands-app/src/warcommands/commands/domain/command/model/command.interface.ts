import { CommandType } from './command-type.enum';

export interface CommandInterface {
    id: string;
    type: CommandType;
    pageId: string;
    commandContainerId: string;
}
