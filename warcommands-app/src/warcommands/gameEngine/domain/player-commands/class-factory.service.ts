import { ClassMemberDTO } from '../command/model/class-member.dto';
import { ClassNameENUM } from '../command/model/class-name.enum';
import { GameClassFactoryService } from './game-class/services/game-class-factory.service';
import { AbstractClassFactoryDefinition } from './abstract-class-factory-definition';
import { BaseClassFactoryService } from './base-class/services/base-class-factory.service';
import { WorkerClassFactoryService } from './worker-class/services/worker-class-factory.service';

export class ClassFactoryService {

    constructor(
        private readonly gameClassFactory: GameClassFactoryService,
        private readonly baseClassFactory: BaseClassFactoryService,
        private readonly workerClassFactory: WorkerClassFactoryService,
    ) {}

    runClass(classMember: ClassMemberDTO, playerId: string, previousMethodChainReturn?: any): void {

        const requestedClass: AbstractClassFactoryDefinition = this.getClassFactory(classMember);
        const returnValue = requestedClass.runCommand(classMember, playerId, previousMethodChainReturn);
        this.runChainedMethod(classMember, playerId, returnValue);

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
            default: {
                throw new Error('Class not defined: ' + classMember.className);
            }
        }

        return requestedClass;
    }

    private runChainedMethod(classMember: ClassMemberDTO, playerId: string, returnValue?: any): void {

        if(classMember.methodChained) {
            this.runClass(classMember.methodChained, playerId, returnValue);
        }

    }

}