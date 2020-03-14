import { CommandType } from './command-type.enum';

export interface GenericCommandDTO {
    id: string;
    type: CommandType;
    fileId: string;
    parentCommandContainerId: string;
    innerCommandContainerIdList?: { [index: string]: string };
}

export interface GenericCommandListDTO {
    [id: string]: GenericCommandDTO;
}
