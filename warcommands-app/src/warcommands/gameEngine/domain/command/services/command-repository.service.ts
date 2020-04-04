import { CommandDTO } from '../model/command.dto';

export abstract class CommandRepositoryService {

    abstract save(command: CommandDTO): void;

    abstract findById(commandId: string): CommandDTO;

    abstract remove(command: CommandDTO): void;

}