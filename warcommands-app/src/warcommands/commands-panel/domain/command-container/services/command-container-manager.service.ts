import { Injectable } from '@angular/core';
import { CommandContainerDTO } from '../model/command-container.dto';
import { FileJsonDTO, CommandContainerJsonDTO } from '../../file/model/file-json.dto';
import { CommandContainerEvents } from './command-container.events';

@Injectable({
    providedIn: 'root'
})
export class CommandContainerManagerService {

    constructor(
        private readonly commandContainerEvents: CommandContainerEvents
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

        this.commandContainerEvents.commandContainerLoadedDispatch(commandContainer);

        for (const command of rawCommandContainer.commands) {
            for (const rawInnerCommandContainer of command.commandContainerList) {
                this.loadCommandContainerFromRawFile(fileId, rawInnerCommandContainer);
            }
        }
    }

}
