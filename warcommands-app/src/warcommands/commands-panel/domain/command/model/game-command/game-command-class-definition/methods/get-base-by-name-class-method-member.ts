import { ClassMemberDTO } from '../../../class-definition/class-member.dto';
import { ClassNameENUM } from '../../../class-definition/class-name.enum';
import { GameMembersENUM } from '../game-members.enum';

export interface GetBaseByNameClassMethodMember extends ClassMemberDTO {
    className: ClassNameENUM.Game;
    returnClassName: ClassNameENUM.Base;
    memberName: GameMembersENUM.GetBaseByName;
}