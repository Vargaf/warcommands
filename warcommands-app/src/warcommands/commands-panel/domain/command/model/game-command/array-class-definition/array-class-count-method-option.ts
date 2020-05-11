import { ClassMemberOptionDTO } from '../../class-definition/class-member-option.dto';
import { ArrayMembersENUM } from './array-members.enum';
import { ClassNameENUM } from '../../class-definition/class-name.enum';

export const ArrayClassCountMethodOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Array,
    value: ArrayMembersENUM.Count,
    label: 'count',
    label_id: 'count'
}