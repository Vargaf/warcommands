import { ClassMemberDTO } from '../../../class-definition/class-member.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { WorkerListMembersENUM } from '../worker-list-members-enum';

export interface WorkerFilterByRoleClassMethodMember extends ClassMemberDTO {
    className: ClassNameENUM.Worker;
    returnClassName: ClassNameENUM.Array;
    memberName: WorkerListMembersENUM.FilterByRole;
}