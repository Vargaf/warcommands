import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { BaseMembersENUM } from '../base-members.enum';

export const BaseClassNumberOfMinionsPropertyOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Base,
    value: BaseMembersENUM.NumberOfMinions,
    label: 'numberOfMinions',
    label_id: 'number_of_minions'
}
