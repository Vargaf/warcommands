import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { WorkerListMembersENUM } from '../worker-list-members-enum';

export const WorkerListClassFilterByRoleMethodOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Worker,
    value: WorkerListMembersENUM.FilterByRole,
    label: 'filterByRole',
    label_id: 'filter_by_role'
}