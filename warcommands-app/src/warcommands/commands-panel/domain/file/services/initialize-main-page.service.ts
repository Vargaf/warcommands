import { FileDTO } from '../model/file.dto';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';
import { GameLoopCommandEntity } from '../../command/model/game-loop-command.enntity';
import { CommandType } from '../../command/model/command-type.enum';
import { FileManagerEvents } from './file-manager.events';
import { CommandContainerEvents } from '../../command-container/services/command-container.events';
import { CommandFromFileLoadEvents } from '../../command/events/command-from-file-load.events';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { CommandContainerRepositoryService } from '../../command-container/services/command-container-repository.service';

@Injectable({
    providedIn: 'root'
})
export class InitializeMainPageService {

    constructor(
        private readonly fileManagerEvents: FileManagerEvents,
        private readonly commandContainerEvents: CommandContainerEvents,
        private readonly commandEvents: CommandFromFileLoadEvents,
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService
    ) {}

    initialize(): FileDTO[] {
        const file: FileDTO = this.createFile();
        this.fileManagerEvents.fileLoadedDispatch(file);

        const commandContainer: CommandContainerDTO = this.createCommandContainer(file);
        this.commandContainerEvents.commandContainerLoadedDispatch(commandContainer);
        this.commandContainerRepositoryService.save(commandContainer);

        const gameLoopCommand: GameLoopCommandEntity = this.createCommand(commandContainer);
        this.commandEvents.commandLoadedDispatch(gameLoopCommand, 0);
        this.commandRepositoryService.save(gameLoopCommand);

        const gameLoopCommandContainer: CommandContainerDTO = this.createInnerCommandContainer(gameLoopCommand);
        this.commandContainerEvents.commandContainerLoadedDispatch(gameLoopCommandContainer);
        this.commandContainerRepositoryService.save(gameLoopCommandContainer);

        return [file];
    }

    private createFile(): FileDTO {
        const mainFile: FileDTO = {
            id: uuid(),
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

    private createCommand(commandContainer: CommandContainerDTO): GameLoopCommandEntity {
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

    private createInnerCommandContainer(command: GameLoopCommandEntity): CommandContainerDTO {

        const commandContainerId = command.innerCommandContainerIdList.commandContainerId;
        const commandContainer: CommandContainerDTO = {
            id: commandContainerId,
            fileId: command.fileId,
            commands: []
        };

        return commandContainer;

    }

}