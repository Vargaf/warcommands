import { Injectable } from '@angular/core';
import { FileRepositoryService } from 'src/warcommands/commands-panel/domain/file/services/file-repository.service';
import { LocalStorageGetOpennedFilesService } from './local-storage-get-openned-files.service';
import * as LocalStorageHelper from './local-storage-share';
import { FileJsonDTO } from 'src/warcommands/commands-panel/domain/file/model/file-json.dto';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageFileRepositoryService implements FileRepositoryService {

    constructor(
        private readonly localStorageGetOpennedFilesService: LocalStorageGetOpennedFilesService
    ) {}

    getOpennedFilesInRaw(): FileJsonDTO[] {
        return this.localStorageGetOpennedFilesService.getOpennedFilesInRaw();
    }

    userHasFiles(): boolean {
        const fileInJson = localStorage.getItem(LocalStorageHelper.userFileListIndex);
        return fileInJson ? true : false;
    }

}
