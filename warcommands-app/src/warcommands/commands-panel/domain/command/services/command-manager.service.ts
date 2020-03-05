import { Injectable } from '@angular/core';
import { FileJsonDTO, CommandContainerJsonDTO } from '../../file/model/file-json.dto';
import { CommandDataFromJSONFactory } from './command-data-from-JSON.factory';
import { CommandEvents } from './command.events';

@Injectable({
    providedIn: 'root'
})
export class CommandManagerService {

    constructor(
        private readonly commandEvents: CommandEvents
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

            for (const rawInnerCommandContainer of rawCommand.commandContainerList) {
                this.loadCommandsFromRawFile(fileId, rawInnerCommandContainer);
            }
        }

    }

}
