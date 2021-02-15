import { ClassMemberDTO } from '../command/model/class-member.dto';

export abstract class AbstractClassFactoryDefinition {

    abstract runCommand(classMember: ClassMemberDTO, playerId: string, previousMethodChainReturn?: any): any;

}