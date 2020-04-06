import { CommandType } from './command-type.enum';
import { ClassMemberDTO } from './class-member.dto';


export class CommandDTO {
    id: string;
    type: CommandType;
    playerId: string;
    parentCommandContainerId: string;
    innerCommandContainerList?: string[];
    classMember?: ClassMemberDTO;
    return?: any;
}