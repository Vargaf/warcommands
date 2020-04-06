import { CommandRepositoryService } from 'src/warcommands/gameEngine/domain/command/services/command-repository.service';
import { CommandDTO } from 'src/warcommands/gameEngine/domain/command/model/command.dto';
import { CommandType } from 'src/warcommands/gameEngine/domain/command/model/command-type.enum';

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

    findByType(commandType:CommandType): CommandDTO[] {
        const commandList: CommandDTO[] = [];

        // tslint:disable-next-line: forin
        for (const commandIndex in this.commandList) {
            const command = this.commandList[commandIndex];
            if (command.type === commandType) {
                commandList.push(command);
            }
        }

        return commandList;
    }

    remove(command: CommandDTO): void {
        delete this.commandList[command.id];
    }



}