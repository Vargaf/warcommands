import { AbstractClassFactoryDefinition } from '../../abstract-class-factory-definition';
import { ClassMemberDTO } from '../../../command/model/class-member.dto';
import { ArrayClassService } from './array-class.service';
import { ArrayClassMemberNameEnum } from '../model/arrayclass-member-name.enum';


export class ArrayClassFactoryService implements AbstractClassFactoryDefinition {

    constructor(
        private readonly arrayClassService: ArrayClassService
    ) {}

    runCommand(classMember: ClassMemberDTO, playerId: string, previousMethodChainReturn?: any): any {
        let returnValue: any = null;

        switch (classMember.memberName) {
            case ArrayClassMemberNameEnum.Count: {
                returnValue = this.arrayClassService.count(previousMethodChainReturn);
                break;
            }
            default: {
                throw new Error('Wrong array class member: ' + classMember.memberName);
            }
        }

        return returnValue;
    }

}