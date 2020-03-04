import { Injectable } from '@angular/core';
import { FileRepositoryService } from 'src/warcommands/commands-panel/domain/file/services/file-repository.service';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';
import { LocalStorageGetOpennedFilesService } from './local-storage-get-openned-files.service';
import * as LocalStorageHelper from './local-storage-share';
import { LocalStorageLoadFileService } from './local-storage-load-file.service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageFileRepositoryService implements FileRepositoryService {

    constructor(
        private readonly localStorageGetOpennedFilesService: LocalStorageGetOpennedFilesService,
        private readonly localStorageLoadFileService: LocalStorageLoadFileService
    ) {}

    getOpennedFiles(): FileDTO[] {
        return this.localStorageGetOpennedFilesService.getOpennedFiles();
    }

    userHasFiles(): boolean {
        const fileInJson = localStorage.getItem(LocalStorageHelper.userFileListIndex);
        return fileInJson ? true : false;
    }

    loadFile(fileId: string): FileDTO {
        return this.localStorageLoadFileService.loadFile(fileId);
    }

}
