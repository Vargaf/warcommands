import { Injectable } from '@angular/core';
import { FileEventListeners } from 'src/warcommands/commands-panel/infrastructure/ngrx/file/file-event-listeners';
import { FileManagerService } from '../../file/services/file-manager.service';
import { CommandContainerManagerService } from '../../command-container/services/command-container-manager.service';
import { FileJsonDTO } from '../../file/model/file-json.dto';

@Injectable({
    providedIn: 'root'
})
export class CommandsPanelManagerService {

    constructor(
        private readonly commandContainerManagerService: CommandContainerManagerService,
        private readonly fileManagerService: FileManagerService,
    ) {}

    loadOpennedFiles(): void {

        if (!this.fileManagerService.isInitializationNeeded()) {
            const rawFiles: FileJsonDTO[] = this.fileManagerService.loadOpennedFilesInRaw();

            for (const rawFile of rawFiles) {
                this.fileManagerService.parseFileFromRaw(rawFile);
                this.commandContainerManagerService.parseCommandContainerFromRawFile(rawFile);
            }
        }
    }

}
