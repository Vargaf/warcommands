import { Injectable } from '@angular/core';
import { FileJsonDTO, CommandContainerJsonDTO } from '../../file/model/file-json.dto';
import { CommandDataFromJSONFactory } from './command-data-from-JSON.factory';
import { CommandFromFileLoadEvents } from '../events/command-from-file-load.events';
import { CommandRepositoryService } from './command-repository.service';

@Injectable({
    providedIn: 'root'
})
export class CommandManagerService {

    constructor(
        private readonly commandEvents: CommandFromFileLoadEvents,
        private readonly commandRepositoryService: CommandRepositoryService
    ) {}

    parseCommandsFromRawFile(rawFile: FileJsonDTO): void {
        this.loadCommandsFromRawFile(rawFile.id, rawFile.commandContainer);
    }

    private loadCommandsFromRawFile(fileId: string, rawCommandContainer: CommandContainerJsonDTO): void {

        // tslint:disable-next-line: forin
        for (const position in rawCommandContainer.commands) {
            const rawCommand = rawCommandContainer.commands[position];
            const command = CommandDataFromJSONFactory.getCommand(rawCommand, fileId, rawCommandContainer.id);

            this.commandEvents.commandLoadedDispatch(command, +position);
            this.commandRepositoryService.save(command);

            for (const rawInnerCommandContainer of rawCommand.commandContainerList) {
                this.loadCommandsFromRawFile(fileId, rawInnerCommandContainer);
            }
        }

    }

}
