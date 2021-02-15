import { CommandDTO } from '../model/command.dto';
import { CommandType } from '../model/command-type.enum';

export abstract class CommandRepositoryService {

    abstract save(command: CommandDTO): void;

    abstract findById(commandId: string): CommandDTO;

    abstract remove(command: CommandDTO): void;

}