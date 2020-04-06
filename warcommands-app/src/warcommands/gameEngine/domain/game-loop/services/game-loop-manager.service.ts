import { CommandRepositoryService } from 'src/warcommands/gameEngine/domain/command/services/command-repository.service';
import { CommandContainerRepository } from '../../command-container/services/command-container-repository';
import { CommandDTO } from '../../command/model/command.dto';
import { CommandType } from '../../command/model/command-type.enum';
import { ClassFactoryService } from '../../player-commands/class-factory.service';


export class GameLoopManagerService {

    constructor(
        private readonly commandRepository: CommandRepositoryService,
        private readonly commandContainerRepository: CommandContainerRepository,
        private readonly classFactoryService: ClassFactoryService
    ) {}

    runGameLoop(gameLoopCommandId: string): void {
        const gameLoopCommand: CommandDTO = this.commandRepository.findById(gameLoopCommandId);

        if (gameLoopCommand) {
            this.runCommandContainer(gameLoopCommand.innerCommandContainerList[0]);
        }

    }

    private runCommandContainer(commandContainerId: string): void {

        const commandContainer = this.commandContainerRepository.findById(commandContainerId);

        for (const commandId of commandContainer.commandList) {
            const command: CommandDTO = this.commandRepository.findById(commandId);
            this.runCommand(command);
        }

    }

    private runCommand(command: CommandDTO): void {

        switch (command.type) {
            case CommandType.Game: {
                this.classFactoryService.runClass(command.classMember);
                break;
            }
            default: {
                throw new Error('Undefined command to run: ' + command.type);
            }
        }



    }

}