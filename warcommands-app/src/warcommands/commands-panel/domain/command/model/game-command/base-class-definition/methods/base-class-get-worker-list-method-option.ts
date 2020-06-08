import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { BaseMembersENUM } from '../base-members.enum';

export const BaseClassGetWorkerListMethodOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Base,
    value: BaseMembersENUM.GetWorkerList,
    label: 'getWorkerList',
    label_id: 'get_worker_list'
}