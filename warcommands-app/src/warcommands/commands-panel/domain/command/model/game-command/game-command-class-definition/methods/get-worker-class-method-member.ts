import { ClassMemberDTO } from '../../../class-definition/class-member.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { BaseMembersENUM } from '../../base-class-definition/base-members.enum';

export interface GetWorkerClassMethodMember extends ClassMemberDTO {
    className: ClassNameENUM.Game;
    returnClassName: ClassNameENUM.Worker;
    memberName: BaseMembersENUM.GetWorker;
}
