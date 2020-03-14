import { Injectable } from '@angular/core';
import { FileManagerService } from '../../file/services/file-manager.service';
import { CommandContainerManagerService } from '../../command-container/services/command-container-manager.service';
import { FileJsonDTO } from '../../file/model/file-json.dto';
import { CommandManagerService } from '../../command/services/command-manager.service';
import { InitializeMainPageService } from '../../file/services/initialize-main-page.service';
import { FileDTO } from '../../file/model/file.dto';
import { JSONFileGeneratorService } from '../../file/services/json-file-generator.service';

@Injectable({
    providedIn: 'root'
})
export class CommandsPanelManagerService {

    constructor(
        private readonly commandContainerManagerService: CommandContainerManagerService,
        private readonly fileManagerService: FileManagerService,
        private readonly commandManagerService: CommandManagerService,
        private readonly initializeMainPageService: InitializeMainPageService,
        private readonly jsonFileGeneratorService: JSONFileGeneratorService,
    ) {}

    loadOpennedFiles(): void {

        if (!this.fileManagerService.isInitializationNeeded()) {
            const rawFiles: FileJsonDTO[] = this.fileManagerService.loadOpennedFilesInRaw();

            for (const rawFile of rawFiles) {
                this.fileManagerService.parseFileFromRaw(rawFile);
                this.commandContainerManagerService.parseCommandContainerFromRawFile(rawFile);
                this.commandManagerService.parseCommandsFromRawFile(rawFile);
            }
        } else {
            this.initializeMainPageService.initialize();
        }
    }

    saveFile(file: FileDTO): void {
        const fileJson: FileJsonDTO = this.jsonFileGeneratorService.buildFileJSON(file);
        this.fileManagerService.saveFile(fileJson);
    }

    closeFile(file: FileDTO): void {

    }

}
