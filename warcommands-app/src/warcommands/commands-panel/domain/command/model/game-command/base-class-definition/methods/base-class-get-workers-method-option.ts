import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { BaseMembersENUM } from '../base-members.enum';

export const BaseClassGetWorkersMethodOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Base,
    value: BaseMembersENUM.GetWorkers,
    label: 'getWorkers',
    label_id: 'get_workers'
}