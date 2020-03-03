import { Injectable } from '@angular/core';
import { InitializeMainPageService } from 'src/warcommands/commands/domain/file-manager/services/initialize-main-page.service';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';
import { v4 as uuid } from 'uuid';
import { FileRepositoryService } from 'src/warcommands/commands/domain/file/services/file-repository.service';
import { CommandContainerRepositoryService } from 'src/warcommands/commands/domain/command-container/services/command-container-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands/domain/command-container/model/command-container.dto';
import { GameLoopCommandEntity } from 'src/warcommands/commands/domain/command/model/game-loop-command.enntity';
import { CommandType } from 'src/warcommands/commands/domain/command/model/command-type.enum';
import { CommandInterface } from 'src/warcommands/commands/domain/command/model/command.interface';
import { CommandRepositoryService } from 'src/warcommands/commands/domain/command/services/command-repository.service';

@Injectable({
    providedIn: 'root'
})
export class LocalFileInitializeMainPageService implements InitializeMainPageService {

    constructor(
        private readonly fileRepositoryService: FileRepositoryService,
        private readonly commandContainerRepository: CommandContainerRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService,
    ) {}

    initialize(): FileDTO[] {

        const file: FileDTO = this.createFile();
        const commandContainer: CommandContainerDTO = this.createCommandContainer(file);
        const gameLoopCommand: CommandInterface = this.createCommand(commandContainer);
        const gameLoopCommandContainers: CommandContainerDTO[] = this.createInnerCommandContainer(gameLoopCommand);

        this.fileRepositoryService.loadFiles([file]);
        this.commandContainerRepository.saveCommandContainer(commandContainer);
        this.commandRepositoryService.saveCommand(gameLoopCommand);
        this.commandContainerRepository.addCommandToCommandContainer(gameLoopCommand, 0);

        for (const innerCommandContainer of gameLoopCommandContainers) {
            this.commandContainerRepository.saveCommandContainer(innerCommandContainer);
        }

        return [file];
    }

    private createFile(): FileDTO {
        const mainFile: FileDTO = {
            id: uuid(),
            isMain: true,
            name: 'Main',
            commandContainerId: uuid()
        };

        return mainFile;
    }

    private createCommandContainer(file: FileDTO): CommandContainerDTO {
        const commandContainer: CommandContainerDTO = {
            id: file.commandContainerId,
            fileId: file.id,
            commands: []
        };

        return commandContainer;
    }

    private createCommand(commandContainer: CommandContainerDTO): CommandInterface {
        const command: GameLoopCommandEntity = {
            id: uuid(),
            type: CommandType.GameLoop,
            fileId: commandContainer.fileId,
            parentCommandContainerId: commandContainer.id,
            innerCommandContainerIdList: {
                commandContainerId: uuid()
            }
        };

        return command;
    }

    private createInnerCommandContainer(command: CommandInterface): CommandContainerDTO[] {

        const commandContainerList: CommandContainerDTO[] = [];

        // tslint:disable-next-line: forin
        for (const commandContainerIndex in command.innerCommandContainerIdList) {
            const commandContainerId = command.innerCommandContainerIdList[commandContainerIndex];
            const commandContainer: CommandContainerDTO = {
                id: commandContainerId,
                fileId: command.fileId,
                commands: []
            };

            commandContainerList.push(commandContainer);
        }

        return commandContainerList;

    }
}
