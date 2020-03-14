import { GenericCommandDTO } from '../model/generic-command.dto';

export abstract class CommandRepositoryService {

    abstract save(command: GenericCommandDTO): void;

    abstract findById(commandId: string): GenericCommandDTO;

    abstract remove(commandId: string): void;

}
