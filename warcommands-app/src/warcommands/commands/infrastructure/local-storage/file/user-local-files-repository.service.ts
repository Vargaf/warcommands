import { Injectable } from '@angular/core';
import { UserFileDTO } from 'src/warcommands/commands/domain/file/model/user-file.dto';
import { UserFilesRepositoryService } from 'src/warcommands/commands/domain/file/services/user-files-repository.service';

@Injectable({
    providedIn: 'root'
})
export class UserLocalFilesRepositoryService extends UserFilesRepositoryService {

    private readonly userFileListIndex = 'user-files';

    addFileToUserFileList(file: UserFileDTO): void {

        let savedFileList: UserFileDTO[];
        savedFileList = this.getUserFileList();

        if (!savedFileList) {
            savedFileList = [];
        }

        const curatedSavedFileList = savedFileList.filter((savedFile: UserFileDTO) => {
            return savedFile.id !== file.id;
        });

        curatedSavedFileList.push(file);
        localStorage.setItem(this.userFileListIndex, JSON.stringify(curatedSavedFileList));

    }

    getUserFileList(): UserFileDTO[] {
        const fileInJson = localStorage.getItem(this.userFileListIndex);
        return JSON.parse(fileInJson) || [];
    }

    private getFileOnList(fileId: string, savedFileList: UserFileDTO[]): UserFileDTO {
        const filteredFile = savedFileList.find((item) => item.id === fileId);
        return filteredFile;
    }

}