import { ClassMemberDTO } from '../model/class-definition/class-member.dto';

export interface CommandClassMemberAddedEventDTO {
    commandId: string;
    classMember: ClassMemberDTO;
}