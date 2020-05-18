import { CommandType } from './command-type.enum';
import { ClassMemberDTO } from './class-member.dto';


export class CommandDTO {
    id: string;
    type: CommandType;
    playerId: string;
    parentCommandContainerId: string;
    innerCommandContainerIdList?: { [index: string]: string };
    classMember?: ClassMemberDTO;
    return?: any;
    data?: any;
}