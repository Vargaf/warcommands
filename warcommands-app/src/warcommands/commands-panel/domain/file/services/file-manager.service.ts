import { Injectable } from '@angular/core';
import { FileDTO } from '../model/file.dto';
import { FileRepositoryService } from './file-repository.service';

@Injectable({
    providedIn: 'root'
})
export class FileManagerService {

    constructor(
        private readonly fileRepositoryService: FileRepositoryService,
    ) {}

    loadOpennedFiles(): FileDTO[] {
        let files: FileDTO[];

        if (this.isInitializationNeeded()) {

        } else {
            files = this.fileRepositoryService.getOpennedFiles();
        }

        return files;
    }

    loadFile(fileId: string): FileDTO {
        return this.fileRepositoryService.loadFile(fileId);
    }

    private isInitializationNeeded(): boolean {
        return !this.fileRepositoryService.userHasFiles();
    }

}
