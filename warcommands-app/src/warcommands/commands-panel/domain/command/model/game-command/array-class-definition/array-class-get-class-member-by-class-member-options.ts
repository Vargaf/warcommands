import { ClassMemberOptionDTO } from '../../class-definition/class-member-option.dto';
import { ClassMemberDTO } from '../../class-definition/class-member.dto';
import { ArrayMembersENUM } from './array-members.enum';
import { ClassNameENUM } from '../../class-definition/class-name.enum';

export class ArrayClassGetClassMemberByClassMemberOptions {

    static getClassMember(classMemberOption: ClassMemberOptionDTO): ClassMemberDTO {

        let classMember: ClassMemberDTO = null;

        switch(classMemberOption.value) {
            case ArrayMembersENUM.Count: {
                classMember = {
                    className: ClassNameENUM.Array,
                    memberName: ArrayMembersENUM.Count
                };
                break;
            }
            default: {
                throw new Error('The given member does not exists in Worker class: ' + classMemberOption.value);
            }
        }

        return classMember;
    }
}