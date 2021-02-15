import { ClassMemberDTO } from '../../../class-definition/class-member.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { WorkerMembersENUM } from '../worker-members.enum';

export interface WorkerGetWorkerListClassMethodMember extends ClassMemberDTO {
    className: ClassNameENUM.Worker;
    returnClassName: ClassNameENUM.Array;
    memberName: WorkerMembersENUM.GetWorkerList;
}