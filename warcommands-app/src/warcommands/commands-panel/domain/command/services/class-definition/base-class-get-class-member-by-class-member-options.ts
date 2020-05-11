import { ClassMemberOptionDTO } from '../../model/class-definition/class-member-option.dto';
import { ClassMemberDTO } from '../../model/class-definition/class-member.dto';
import { ClassNameENUM } from '../../model/class-definition/class-name.enum';
import { BaseMembersENUM } from '../../model/game-command/base-class-definition/base-members.enum';
import { WorkerMembersENUM } from '../../model/game-command/worker-class-definition/worker-members.enum';

export class BaseClassGetClassMemberByClassMemberOption {

    static getClassMember(classMemberOption: ClassMemberOptionDTO): ClassMemberDTO {

        let classMember: ClassMemberDTO = null;

        switch(classMemberOption.value) {
            case BaseMembersENUM.CreateWorker: {
                classMember = {
                    className: ClassNameENUM.Base,
                    memberName: BaseMembersENUM.CreateWorker
                };
                break;
            }
            case BaseMembersENUM.NumberOfWorkers: {
                classMember = {
                    className: ClassNameENUM.Base,
                    memberName: BaseMembersENUM.NumberOfWorkers
                };
                break;
            }
            case BaseMembersENUM.GetWorkers: {
                classMember = {
                    className: ClassNameENUM.Worker,
                    memberName: WorkerMembersENUM.GetWorkers
                }
                break;
            }
            default: {
                throw new Error('The given member does not exists in Base class: ' + classMemberOption.value);
            }
        }

        return classMember;
    }

}