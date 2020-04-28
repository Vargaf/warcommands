import { ClassMemberDTO } from '../../../class-definition/class-member.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { BaseMembersENUM } from '../base-members.enum';

export interface CreateWorkerClassMethodMemberDTO extends ClassMemberDTO {
    className: ClassNameENUM.Base;
    memberName: BaseMembersENUM.CreateWorker;
}