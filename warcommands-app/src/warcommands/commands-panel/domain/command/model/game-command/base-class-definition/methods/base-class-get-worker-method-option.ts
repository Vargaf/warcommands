import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { BaseMembersENUM } from '../base-members.enum';

export const BaseClassGetWorkerMethodOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Base,
    value: BaseMembersENUM.GetWorker,
    label: 'getWorker',
    label_id: 'get_worker'
};