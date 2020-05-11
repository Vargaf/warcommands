import { ClassMemberDTO } from '../../model/class-definition/class-member.dto';
import { ClassMemberOptionDTO } from '../../model/class-definition/class-member-option.dto';
import { ClassNameENUM } from '../../model/class-definition/class-name.enum';
import { GameClassGetClassMemberByClassMemberOption } from './game-class-get-class-member-by-class-member-options';
import { BaseClassGetClassMemberByClassMemberOption } from './base-class-get-class-member-by-class-member-options';
import { WorkerClassGetClassMemberByClassMemberOptions } from './worker-class-get-class-member-by-class-member-options';
import { ArrayClassGetClassMemberByClassMemberOptions } from '../../model/game-command/array-class-definition/array-class-get-class-member-by-class-member-options';

export class GetClassMemberByclassMemberOption {

    static getClassMember(classMemberOption: ClassMemberOptionDTO) : ClassMemberDTO {

        let classMember: ClassMemberDTO;

        switch (classMemberOption.className) {
            case ClassNameENUM.Game: {
                classMember = GameClassGetClassMemberByClassMemberOption.getClassMember(classMemberOption);
                break;
            }
            case ClassNameENUM.Base: {
                classMember = BaseClassGetClassMemberByClassMemberOption.getClassMember(classMemberOption);
                break;
            }
            case ClassNameENUM.Worker: {
                classMember = WorkerClassGetClassMemberByClassMemberOptions.getClassMember(classMemberOption);
                break;
            }
            case ClassNameENUM.Array: {
                classMember = ArrayClassGetClassMemberByClassMemberOptions.getClassMember(classMemberOption);
                break;
            }
            default: {
                throw new Error('Unknown class: ' + classMemberOption.className);
            }
        }

        return classMember;

    }

}