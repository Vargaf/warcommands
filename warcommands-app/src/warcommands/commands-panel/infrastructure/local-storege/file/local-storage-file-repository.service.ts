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
        const userFileList = localStorage.getItem(LocalStorageHelper.userFileListIndex);
        return userFileList ? true : false;
    }

    saveFile(file: FileJsonDTO): void {
        if (this.isNewFile(file.id)) {
            this.addNewFileToUserFileList(file);
        }

        localStorage.setItem(file.id, JSON.stringify(file));
    }

    getFiles(): FileJsonDTO[] {
        return this.localStorageGetOpennedFilesService.getFiles();
    }

    private isNewFile(fileId: string): boolean {
        const userFile = localStorage.getItem(fileId);
        return userFile ? false : true;
    }

    private addNewFileToUserFileList(file: FileJsonDTO): void {
        const newUserFile: LocalStorageHelper.UserFileDTO = {
            id: file.id,
            isOppenedOnCommandPanel: true,
            name: file.name
        };

        const rawUerFileList = localStorage.getItem(LocalStorageHelper.userFileListIndex);
        const userFileList: LocalStorageHelper.UserFileDTO[] = JSON.parse(rawUerFileList) || [];

        userFileList.push(newUserFile);

        localStorage.setItem(LocalStorageHelper.userFileListIndex, JSON.stringify(userFileList));
    }

}
