import { ClassMemberDTO } from '../../../class-definition/class-member.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { WorkerMembersENUM } from '../worker-members.enum';

export interface WorkerGetWorkersClassMethodMember extends ClassMemberDTO {
    className: ClassNameENUM.Worker;
    returnClassName: ClassNameENUM.Array;
    memberName: WorkerMembersENUM.GetWorkers;
}