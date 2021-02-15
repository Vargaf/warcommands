import { ClassMemberDTO } from '../command/model/class-member.dto';
import { ClassNameENUM } from '../command/model/class-name.enum';
import { GameClassFactoryService } from './game-class/services/game-class-factory.service';
import { AbstractClassFactoryDefinition } from './abstract-class-factory-definition';
import { BaseClassFactoryService } from './base-class/services/base-class-factory.service';
import { WorkerClassFactoryService } from './worker-class/services/worker-class-factory.service';
import { ArrayClassFactoryService } from './array-class/services/array-class-factory.service';

export class ClassFactoryService {

    constructor(
        private readonly gameClassFactory: GameClassFactoryService,
        private readonly baseClassFactory: BaseClassFactoryService,
        private readonly workerClassFactory: WorkerClassFactoryService,
        private readonly arrayClassFactory: ArrayClassFactoryService
    ) {}

    runClass(classMember: ClassMemberDTO, playerId: string, previousMethodChainReturn?: any): any  {

        const requestedClass: AbstractClassFactoryDefinition = this.getClassFactory(classMember);
        let returnValue = requestedClass.runCommand(classMember, playerId, previousMethodChainReturn);
        returnValue = this.runChainedMethod(classMember, playerId, returnValue);

        return returnValue;
    }

    private getClassFactory(classMember: ClassMemberDTO): AbstractClassFactoryDefinition {

        let requestedClass: AbstractClassFactoryDefinition = null;

        switch (classMember.className) {
            case ClassNameENUM.Game: {
                requestedClass = this.gameClassFactory;
                break;
            }
            case ClassNameENUM.Base: {
                requestedClass = this.baseClassFactory;
                break;
            }
            case ClassNameENUM.Worker: {
                requestedClass = this.workerClassFactory;
                break;
            }
            case ClassNameENUM.Array: {
                requestedClass = this.arrayClassFactory;
                break;
            }
            default: {
                throw new Error('Class not defined: ' + classMember.className);
            }
        }

        return requestedClass;
    }

    private runChainedMethod(classMember: ClassMemberDTO, playerId: string, returnValue?: any): void {

        let chainedMethodReturnValue: any = null;

        if(classMember.methodChained) {
            chainedMethodReturnValue = this.runClass(classMember.methodChained, playerId, returnValue);
        } else {
            chainedMethodReturnValue = returnValue;
        }

        return chainedMethodReturnValue;

    }

}