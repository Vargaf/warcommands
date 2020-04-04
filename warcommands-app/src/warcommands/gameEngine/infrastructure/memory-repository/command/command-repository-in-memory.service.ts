import { CommandRepositoryService } from 'src/warcommands/gameEngine/domain/command/services/command-repository.service';
import { CommandDTO } from 'src/warcommands/gameEngine/domain/command/model/command.dto';

interface CommandList {
    [index: string]: CommandDTO;
}

export class CommandRepositoryInMemoryService implements CommandRepositoryService {

    private commandList: CommandList = {};

    save (command: CommandDTO): void {
        this.commandList[command.id] = command;

    }
    findById(commandId: string): CommandDTO {
        return this.commandList[commandId] || null;
    }
    remove(command: CommandDTO): void {
        delete this.commandList[command.id];
    }



}