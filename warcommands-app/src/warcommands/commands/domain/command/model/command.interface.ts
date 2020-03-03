import { CommandType } from './command-type.enum';

export interface CommandInterface {
    id: string;
    type: CommandType;
    fileId: string;
    parentCommandContainerId: string;
    innerCommandContainerIdList?: { [index: string]: string };
}
