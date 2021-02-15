import { CommandContainerRepository } from 'src/warcommands/gameEngine/domain/command-container/services/command-container-repository';
import { CommandContainerDTO } from 'src/warcommands/gameEngine/domain/command-container/model/command-container.dto';

interface CommandContainerList {
    [index: string]: CommandContainerDTO;
}

export class InMemoryCommandContainerRepositoryService implements CommandContainerRepository {

    private commandContainerList: CommandContainerList = {};

    save(commandContainer: CommandContainerDTO): void {
        this.commandContainerList[commandContainer.id] = commandContainer;
    }

    findById(commandContainerId: string): CommandContainerDTO {
        return this.commandContainerList[commandContainerId];
    }

    remove(commandContainer: CommandContainerDTO): void {
        delete this.commandContainerList[commandContainer.id];
    }

}