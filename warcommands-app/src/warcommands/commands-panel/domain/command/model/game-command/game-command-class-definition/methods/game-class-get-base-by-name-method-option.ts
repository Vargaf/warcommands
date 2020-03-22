import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { GameMembersENUM } from '../game-members.enum';

export const GameClassGetBaseByNameMethodOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Game,
    value: GameMembersENUM.GetBaseByName,
    label: 'getBaseByName',
    label_id: 'get_base_by_name'
};
