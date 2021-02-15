import { CommandContainerDTO } from '../model/command-container.dto';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';

export abstract class CommandContainerRepositoryService {
    
    abstract save(commandContainer: CommandContainerDTO): void;

    abstract findById(id: string): CommandContainerDTO;

    abstract remove(id: string): void;

    abstract removeCommand(command: GenericCommandDTO): void;
}