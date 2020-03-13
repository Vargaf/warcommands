import { CommandContainerDTO } from '../model/command-container.dto';

export abstract class CommandContainerRepositoryService {
    
    abstract save(commandContainer: CommandContainerDTO): void;

    abstract findById(id: string): CommandContainerDTO;

    abstract remove(id: string): void;
}