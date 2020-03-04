import { Injectable } from '@angular/core';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';
import * as LocalStorageHelper from './local-storage-share';
import { LocalStorageLoadFileService } from './local-storage-load-file.service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageGetOpennedFilesService {

    constructor(
        private readonly localStorageLoadFileService: LocalStorageLoadFileService
    ) {}

    getOpennedFiles(): FileDTO[] {
        const savedFileList = this.getUserFileList();
        const rawOpennedFileList = this.fileterOpennedFiles(savedFileList);

        return this.loadFiles(rawOpennedFileList);
    }

    private getUserFileList(): LocalStorageHelper.UserFileDTO[] {
        const fileInJson = localStorage.getItem(LocalStorageHelper.userFileListIndex);
        return JSON.parse(fileInJson) || [];
    }

    private fileterOpennedFiles(fileList: LocalStorageHelper.UserFileDTO[]): LocalStorageHelper.UserFileDTO[] {
        return fileList.filter((file) => {
            return file.isOppenedOnCommandPanel;
        });
    }

    private loadFiles(rawOpennedFileList: LocalStorageHelper.UserFileDTO[]): FileDTO[] {
        const files: FileDTO[] = [];

        for (const userFile of rawOpennedFileList) {
            const loadedFile = this.loadFile(userFile.id);
            files.push(loadedFile);
        }

        return files;
    }

    loadFile(fileId: string): FileDTO {
        return this.localStorageLoadFileService.loadFile(fileId);
    }

}
