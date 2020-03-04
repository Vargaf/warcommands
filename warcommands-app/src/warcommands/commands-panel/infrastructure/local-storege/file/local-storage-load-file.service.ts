import { Injectable } from '@angular/core';
import { FileDTO } from 'src/warcommands/commands-panel/domain/file/model/file.dto';
import * as LocalStorageHelper from './local-storage-share';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageLoadFileService {

    loadFile(fileId: string): FileDTO {
        const rawFile = this.getRawFile(fileId);
        return this.buildFileDTO(rawFile);
    }

    private getRawFile(fileId: string): LocalStorageHelper.FileJsonDTO {
        return JSON.parse(localStorage.getItem(fileId));
    }

    private buildFileDTO(jsonFile: LocalStorageHelper.FileJsonDTO): FileDTO {
        const fileDTO: FileDTO = {
            id: jsonFile.id,
            name: jsonFile.name,
            commandContainerId: jsonFile.commandContainer.id
        };

        return fileDTO;
    }

}
