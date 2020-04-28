import { AbstractClassFactoryDefinition } from '../../abstract-class-factory-definition';
import { ClassMemberDTO } from '../../../command/model/class-member.dto';
import { BaseClassService } from './base-class-service';
import { BaseClassMemberNameEnum } from '../model/base-class-member-name.enum';

export class BaseClassFactoryService implements AbstractClassFactoryDefinition {

    constructor(
        private readonly baseClassService: BaseClassService
    ) {}

    runCommand(classMember: ClassMemberDTO, playerId: string, previousMethodChainReturn?: any): any {
        let returnValue: any = null;

        switch (classMember.memberName) {
            case BaseClassMemberNameEnum.CreateWorker: {
                returnValue = this.baseClassService.createWorker(previousMethodChainReturn);
                break;
            }

            default: {
                throw new Error('Wrong game class member: ' + classMember.memberName);
            }
        }

        return returnValue;
    }

}