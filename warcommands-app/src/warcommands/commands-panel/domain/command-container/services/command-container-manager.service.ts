import { Injectable } from '@angular/core';
import { CommandContainerDTO } from '../model/command-container.dto';
import { FileJsonDTO, CommandContainerJsonDTO } from '../../file/model/file-json.dto';
import { CommandContainerEvents } from './command-container.events';
import { CommandContainerRepositoryService } from './command-container-repository.service';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerManagerService {

    constructor(
        private readonly commandContainerEvents: CommandContainerEvents,
        private readonly commandContainerReposytoryService: CommandContainerRepositoryService
    ) {}

    parseCommandContainerFromRawFile(rawFile: FileJsonDTO): void {
        this.loadCommandContainerFromRawFile(rawFile.id, rawFile.commandContainer);
    }

    private loadCommandContainerFromRawFile(
        fileId: string,
        rawCommandContainer: CommandContainerJsonDTO
    ): void {

        const commandContainer: CommandContainerDTO = {
            id: rawCommandContainer.id,
            fileId,
            commands: []
        };

        for (const command of rawCommandContainer.commands) {
            commandContainer.commands.push(command.id);
            for (const rawInnerCommandContainer of command.commandContainerList) {
                this.loadCommandContainerFromRawFile(fileId, rawInnerCommandContainer);
            }
        }

        this.commandContainerEvents.commandContainerLoadedDispatch(commandContainer);
        this.commandContainerReposytoryService.save(commandContainer);
    }

}