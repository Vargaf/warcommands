import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { BaseMembersENUM } from '../base-members.enum';

export const BaseClassCreateMinionMethodOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Base,
    value: BaseMembersENUM.CreateMinion,
    label: 'createMinion',
    label_id: 'create_minion'
};