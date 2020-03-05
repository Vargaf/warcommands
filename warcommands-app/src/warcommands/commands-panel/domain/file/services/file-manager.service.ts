import { Injectable } from '@angular/core';
import { FileDTO } from '../model/file.dto';
import { FileRepositoryService } from './file-repository.service';
import { FileManagerEvents } from './file-manager.events';
import { FileJsonDTO } from '../model/file-json.dto';

@Injectable({
    providedIn: 'root'
})
export class FileManagerService {

    constructor(
        private readonly fileRepositoryService: FileRepositoryService,
        private readonly fileManagerEvents: FileManagerEvents,
    ) {}

    loadOpennedFilesInRaw(): FileJsonDTO[] {
        return this.fileRepositoryService.getOpennedFilesInRaw();
    }

    parseFileFromRaw(rawFile: FileJsonDTO): void {
        const fileDTO: FileDTO = {
            id: rawFile.id,
            name: rawFile.name,
            commandContainerId: rawFile.commandContainer.id
        };

        this.fileManagerEvents.fileLoadedDispatch(fileDTO);
    }

    isInitializationNeeded(): boolean {
        return !this.fileRepositoryService.userHasFiles();
    }

}
