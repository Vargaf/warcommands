import { ClassMemberOptionDTO } from '../../model/class-definition/class-member-option.dto';
import { ClassMemberDTO } from '../../model/class-definition/class-member.dto';
import { ClassNameENUM } from '../../model/class-definition/class-name.enum';
import { BaseMembersENUM } from '../../model/game-command/base-class-definition/base-members.enum';
import { WorkerMembersENUM } from '../../model/game-command/worker-class-definition/worker-members.enum';

export class BaseClassGetClassMemberByClassMemberOption {

    static getClassMember(classMemberOption: ClassMemberOptionDTO): ClassMemberDTO {

        let classMember!: ClassMemberDTO;

        switch(classMemberOption.value) {
            case BaseMembersENUM.CreateWorker: {
                classMember = {
                    className: ClassNameENUM.Base,
                    returnClassName: ClassNameENUM.Worker,
                    memberName: BaseMembersENUM.CreateWorker,
                    methodChained: null,
                    args: []
                };
                break;
            }
            case BaseMembersENUM.GetWorker: {
                classMember = {
                    className: ClassNameENUM.Base,
                    returnClassName: ClassNameENUM.Worker,
                    memberName: BaseMembersENUM.GetWorker,
                    methodChained: null,
                    args: []
                };
                break;
            }
            case BaseMembersENUM.NumberOfWorkers: {
                classMember = {
                    className: ClassNameENUM.Base,
                    returnClassName: ClassNameENUM.Number,
                    memberName: BaseMembersENUM.NumberOfWorkers,
                    methodChained: null,
                    args: []
                };
                break;
            }
            case BaseMembersENUM.GetWorkerList: {
                classMember = {
                    className: ClassNameENUM.Worker,
                    returnClassName: ClassNameENUM.Array,
                    memberName: WorkerMembersENUM.GetWorkerList,
                    methodChained: null,
                    args: []
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