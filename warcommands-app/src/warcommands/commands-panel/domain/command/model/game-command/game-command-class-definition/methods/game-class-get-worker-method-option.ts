import { ClassMemberOptionDTO } from '../../../class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { GameMembersENUM } from '../game-members.enum';

export const GameClassGetWorkerMethodOption: ClassMemberOptionDTO = {
    className: ClassNameENUM.Game,
    value: GameMembersENUM.GetWorker,
    label: 'getWorker',
    label_id: 'get_worker'
};