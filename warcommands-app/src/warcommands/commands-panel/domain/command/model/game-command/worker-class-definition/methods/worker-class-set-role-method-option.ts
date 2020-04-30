import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { WorkerMembersENUM } from '../worker-members.enum';

export const WorkerClassSetRoleMethodOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Worker,
    value: WorkerMembersENUM.SetRole,
    label: 'setRole',
    label_id: 'setRole'
};