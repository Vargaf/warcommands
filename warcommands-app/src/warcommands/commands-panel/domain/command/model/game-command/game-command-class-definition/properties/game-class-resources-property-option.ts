import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { GameMembersENUM } from '../game-members.enum';

export const GameClassResourcesPropertyOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Game,
    value: GameMembersENUM.Resources,
    label: 'resources',
    label_id: 'resources'
}
