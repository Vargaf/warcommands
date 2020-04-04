import { CommandType } from './command-type.enum';
import { ClassMemberDTO } from './class-member.dto';


export class CommandDTO {
    id: string;
    type: CommandType;
    parentCommandContainerId: string;
    innerCommandContainerList?: string[];
    classMember?: ClassMemberDTO;
    return?: any;
}