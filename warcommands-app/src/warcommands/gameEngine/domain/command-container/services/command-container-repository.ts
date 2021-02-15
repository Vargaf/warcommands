import { CommandContainerDTO } from '../model/command-container.dto';

export abstract class CommandContainerRepository {

    abstract save(commandContainer: CommandContainerDTO): void;

    abstract findById(commandContainerId: string): CommandContainerDTO;

    abstract remove(commandContainer: CommandContainerDTO): void;

}