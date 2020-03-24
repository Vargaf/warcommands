import { GenericCommandDTO } from '../model/generic-command.dto';
import { ClassMemberDTO } from '../model/class-definition/class-member.dto';

export abstract class CommandRepositoryService {

    abstract save(command: GenericCommandDTO): void;

    abstract findById(commandId: string): GenericCommandDTO;

    abstract remove(commandId: string): void;

    abstract addClassMember(commandId: string, classMember: ClassMemberDTO): void;

}
