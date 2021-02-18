import { FileDTO } from '../model/file.dto';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { CommandContainerDTO } from '../../command-container/model/command-container.dto';
import { GameLoopCommandEntity } from '../../command/model/game-loop-command.entity';
import { CommandType } from '../../command/model/command-type.enum';
import { FileManagerEvents } from './file-manager.events';
import { CommandContainerEvents } from '../../command-container/services/command-container.events';
import { CommandFromFileLoadEvents } from '../../command/events/command-from-file-load.events';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { CommandContainerRepositoryService } from '../../command-container/services/command-container-repository.service';
import { CurrentPlayerRepositoryService } from '../../current-player/services/current-player-repository.service';
import { CurrentPlayerDTO } from '../../current-player/model/current-player.dto';

@Injectable({
    providedIn: 'root'
})
export class InitializeMainPageService {

    constructor(
        private readonly fileManagerEvents: FileManagerEvents,
        private readonly commandContainerEvents: CommandContainerEvents,
        private readonly commandEvents: CommandFromFileLoadEvents,
        private readonly commandRepositoryService: CommandRepositoryService,
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService,
        private readonly currentPlayerRepositoryService: CurrentPlayerRepositoryService
    ) {}

    initialize(): FileDTO[] {
        const file: FileDTO = this.createFile();
        this.fileManagerEvents.opennedFileLoadedDispatch(file);

        const commandContainer: CommandContainerDTO = this.createCommandContainer(file);
        const gameLoopCommand: GameLoopCommandEntity = this.createCommand(commandContainer);
        const gameLoopCommandContainer: CommandContainerDTO = this.createInnerCommandContainer(gameLoopCommand);

        commandContainer.commands = [gameLoopCommand.id];

        this.commandContainerRepositoryService.save(commandContainer);
        this.commandRepositoryService.save(gameLoopCommand);
        this.commandContainerRepositoryService.save(gameLoopCommandContainer);

        this.commandContainerEvents.commandContainerLoadedDispatch(commandContainer);
        this.commandEvents.commandLoadedDispatch(gameLoopCommand, 0);
        this.commandContainerEvents.commandContainerLoadedDispatch(gameLoopCommandContainer);

        return [file];
    }

    private createFile(): FileDTO {
        const currentPlayer: CurrentPlayerDTO = this.currentPlayerRepositoryService.getPlayer();
        const mainFile: FileDTO = {
            id: uuid(),
            name: 'Main',
            playerId: <string>currentPlayer.id,
            commandContainerId: uuid()
        };

        return mainFile;
    }

    private createCommandContainer(file: FileDTO): CommandContainerDTO {
        const commandContainer: CommandContainerDTO = {
            id: file.commandContainerId,
            fileId: file.id,
            parentCommandId: null,
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
            },
            commandPathErrorsCounter: 0,
        };

        return command;
    }

    private createInnerCommandContainer(command: GameLoopCommandEntity): CommandContainerDTO {

        const commandContainerId = command.innerCommandContainerIdList.commandContainerId;
        const commandContainer: CommandContainerDTO = {
            id: commandContainerId,
            fileId: command.fileId,
            parentCommandId: command.id,
            commands: []
        };

        return commandContainer;

    }

}