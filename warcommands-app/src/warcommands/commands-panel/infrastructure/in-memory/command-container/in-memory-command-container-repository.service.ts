import { Injectable } from "@angular/core";
import { CommandContainerRepositoryService } from 'src/warcommands/commands-panel/domain/command-container/services/command-container-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands-panel/domain/command-container/model/command-container.dto';

interface CommandContainerList {
    [ index: string]: CommandContainerDTO;
}

@Injectable({
    providedIn: 'root'
})
export class InMemoryCommandContainerRepositoryService implements CommandContainerRepositoryService {
    
    private commandContainerList: CommandContainerList = {};

    save(commandContainer: CommandContainerDTO): void {
        const commandContainerCopy = { ...commandContainer };
        commandContainerCopy.commands = [ ...commandContainerCopy.commands ];
        this.commandContainerList[commandContainer.id] = commandContainerCopy;
    }
    
    findById(id: string): CommandContainerDTO {
        const commandContainer = this.commandContainerList[id];
        return { ...commandContainer };
    }

    remove(id: string): void {
        delete this.commandContainerList[id];
    }
    
}