import { ClassMemberOptionDTO } from '../../model/class-definition/class-member-option.dto';
import { ClassMemberDTO } from '../../model/class-definition/class-member.dto';
import { WorkerMembersENUM } from '../../model/game-command/worker-class-definition/worker-members.enum';
import { ClassNameENUM } from '../../model/class-definition/class-name.enum';
import { WorkerListMembersENUM } from '../../model/game-command/worker-class-definition/worker-list-members-enum';

export class WorkerClassGetClassMemberByClassMemberOptions {

    static getClassMember(classMemberOption: ClassMemberOptionDTO): ClassMemberDTO {

        let classMember: ClassMemberDTO = null;

        switch(classMemberOption.value) {
            case WorkerMembersENUM.SetRole: {
                classMember = {
                    className: ClassNameENUM.Worker,
                    memberName: WorkerMembersENUM.SetRole,
                    args: []
                };
                break;
            }
            case WorkerListMembersENUM.FilterByRole: {
                classMember = {
                    className: ClassNameENUM.Worker,
                    memberName: WorkerListMembersENUM.FilterByRole,
                    args: []
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