import { ClassMemberDTO } from '../../../class-definition/class-member.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { GameMembersENUM } from '../game-members.enum';

export interface ResourcesClassPropertMember extends ClassMemberDTO {
    className: ClassNameENUM.Game;
    returnClassName: ClassNameENUM.Number;
    memberName: GameMembersENUM.Resources;
}
