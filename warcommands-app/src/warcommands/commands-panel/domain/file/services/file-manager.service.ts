import { Injectable } from '@angular/core';
import { FileDTO } from '../model/file.dto';
import { FileRepositoryService } from './file-repository.service';
import { FileManagerEvents } from './file-manager.events';

@Injectable({
    providedIn: 'root'
})
export class FileManagerService {

    constructor(
        private readonly fileRepositoryService: FileRepositoryService,
        private readonly fileManagerEvents: FileManagerEvents
    ) {}

    loadOpennedFiles(): FileDTO[] {
        let files: FileDTO[];

        if (this.isInitializationNeeded()) {

        } else {
            files = this.fileRepositoryService.getOpennedFiles();
            this.dispatchLoadedFilesEvent(files);
        }

        return files;
    }

    loadFile(fileId: string): FileDTO {
        const file = this.fileRepositoryService.loadFile(fileId);
        this.fileManagerEvents.fileLoadedDispatch(file);
        return file;
    }

    private isInitializationNeeded(): boolean {
        return !this.fileRepositoryService.userHasFiles();
    }

    private dispatchLoadedFilesEvent(files: FileDTO[]): void {
        for (const file of files) {
            this.fileManagerEvents.fileLoadedDispatch(file);
        }
    }

}
