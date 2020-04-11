import { AbstractClassFactoryDefinition } from '../abstract-class-factory-definition';
import { ClassMemberDTO } from '../../command/model/class-member.dto';
import { BaseClassService } from './base-class-service';

export class BaseClassFactoryService implements AbstractClassFactoryDefinition {

    constructor(
        private readonly baseClassService: BaseClassService
    ) {}

    runCommand(classMember: ClassMemberDTO, playerId: string, previousMethodChainReturn?: any) {
        throw new Error('Method not implemented.');
    }

}