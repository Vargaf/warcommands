import { CommandType } from './command-type.enum';
import { ClassMemberDTO } from './class-definition/class-member.dto';

export interface GenericCommandDTO {
    id: string;
    type: CommandType;
    fileId: string;
    parentCommandContainerId: string;
    innerCommandContainerIdList?: { [index: string]: string };
    classMember?: ClassMemberDTO | null;
    data?: any;
    commandPathErrorsCounter: number;
}

export interface GenericCommandListDTO {
    [id: string]: GenericCommandDTO;
}
