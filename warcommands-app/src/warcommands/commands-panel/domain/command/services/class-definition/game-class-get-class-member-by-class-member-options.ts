import { ClassMemberOptionDTO } from '../../model/class-definition/class-member-option.dto';
import { ClassMemberDTO } from '../../model/class-definition/class-member.dto';
import { ClassNameENUM } from '../../model/class-definition/class-name.enum';
import { GameMembersENUM } from '../../model/game-command/game-command-class-definition/game-members.enum';

export class GameClassGetClassMemberByClassMemberOption {

    static getClassMember(classMemberOption: ClassMemberOptionDTO): ClassMemberDTO {

        let classMember: ClassMemberDTO = null;

        switch(classMemberOption.value) {
            case GameMembersENUM.GetBaseByName: {
                classMember = {
                    className: ClassNameENUM.Game,
                    returnClassName: ClassNameENUM.Base,
                    memberName: GameMembersENUM.GetBaseByName,
                    methodChained: null,
                    args: []
                };
                break;
            }
            case GameMembersENUM.Resources: {
                classMember = {
                    className: ClassNameENUM.Game,
                    returnClassName: ClassNameENUM.Number,
                    memberName: GameMembersENUM.Resources,
                    methodChained: null,
                    args: []
                };
                break;
            }
            case GameMembersENUM.GetWorker: {
                classMember = {
                    className: ClassNameENUM.Game,
                    returnClassName: ClassNameENUM.Worker,
                    memberName: GameMembersENUM.GetWorker,
                    methodChained: null,
                    args: []
                }
                break;
            }
            default: {
                throw new Error('The given member does not exists in Game class: ' + classMemberOption.value);
            }
        }

        return classMember;
    }

}