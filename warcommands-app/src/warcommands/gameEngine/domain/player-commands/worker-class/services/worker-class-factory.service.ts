import { AbstractClassFactoryDefinition } from '../../abstract-class-factory-definition';
import { ClassMemberDTO } from '../../../command/model/class-member.dto';
import { WorkerClassService } from './worker-class.service';
import { WorkerClassMemberNameENUM } from '../model/worker-class-member-name.enum';

export class WorkerClassFactoryService implements AbstractClassFactoryDefinition {

    constructor(
        private readonly workerClassService: WorkerClassService
    ) {}

    runCommand(classMember: ClassMemberDTO, playerId: string, previousMethodChainReturn?: any): any {
        let returnValue: any = null;

        switch (classMember.memberName) {
            case WorkerClassMemberNameENUM.SetRole: {
                returnValue = this.workerClassService.setRole(previousMethodChainReturn, classMember.args[0]);
                break;
            }
            case WorkerClassMemberNameENUM.GetWorkerList: {
                returnValue = this.workerClassService.getWorkerList(classMember.args, previousMethodChainReturn);
                break;
            }
            case WorkerClassMemberNameENUM.FilterByRole: {
                returnValue = this.workerClassService.filterByRole(previousMethodChainReturn, classMember.args[0]);
                break;
            }
            default: {
                throw new Error('Wrong worker class member: ' + classMember.memberName);
            }
        }

        return returnValue;
    }

}