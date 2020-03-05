import { Injectable } from '@angular/core';
import * as LocalStorageHelper from './local-storage-share';
import { FileJsonDTO } from 'src/warcommands/commands-panel/domain/file/model/file-json.dto';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageGetOpennedFilesService {

    getOpennedFilesInRaw(): FileJsonDTO[] {

        const savedFileList = this.getUserFileList();
        const opennedFileList = this.fileterOpennedFiles(savedFileList);
        const rawOpennedFileList: FileJsonDTO[] = [];

        for (const userFile of opennedFileList) {
            const rawFile = JSON.parse(localStorage.getItem(userFile.id));
            rawOpennedFileList.push(rawFile);
        }

        return rawOpennedFileList;
    }

    private fileterOpennedFiles(fileList: LocalStorageHelper.UserFileDTO[]): LocalStorageHelper.UserFileDTO[] {
        return fileList.filter((file) => {
            return file.isOppenedOnCommandPanel;
        });
    }

    private getUserFileList(): LocalStorageHelper.UserFileDTO[] {
        const fileInJson = localStorage.getItem(LocalStorageHelper.userFileListIndex);
        return JSON.parse(fileInJson) || [];
    }

}
