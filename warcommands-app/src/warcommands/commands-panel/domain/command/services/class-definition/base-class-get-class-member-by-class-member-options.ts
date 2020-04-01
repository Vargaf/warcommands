import { ClassMemberOptionDTO } from '../../model/class-definition/class-member-option.dto';
import { ClassMemberDTO } from '../../model/class-definition/class-member.dto';
import { ClassNameENUM } from '../../model/class-definition/class-name.enum';
import { BaseMembersENUM } from '../../model/game-command/base-class-definition/base-members.enum';

export class BaseClassGetClassMemberByClassMemberOption {

    static getClassMember(classMemberOption: ClassMemberOptionDTO): ClassMemberDTO {

        let classMember: ClassMemberDTO = null;

        switch(classMemberOption.value) {
            case BaseMembersENUM.CreateMinion: {
                classMember = {
                    className: ClassNameENUM.Base,
                    memberName: BaseMembersENUM.CreateMinion
                };
                break;
            }
            case BaseMembersENUM.NumberOfMinions: {
                classMember = {
                    className: ClassNameENUM.Base,
                    memberName: BaseMembersENUM.NumberOfMinions
                };
                break;
            }
            default: {
                throw new Error('The given member does not exists in Base class: ' + classMemberOption.value);
            }
        }

        return classMember;
    }

}