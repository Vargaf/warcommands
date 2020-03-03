import { Injectable } from '@angular/core';
import { SaveFileRepositoryService } from 'src/warcommands/commands/domain/file/services/save-file-repository.service';
import { FileJsonDTO } from 'src/warcommands/commands/domain/file/model/file-json.dto';

@Injectable({
    providedIn: 'root'
})
export class SaveFileLocalStorageRepositorySerice extends SaveFileRepositoryService {

    saveFile(jsonFile: FileJsonDTO): void {

        localStorage.setItem(jsonFile.id, JSON.stringify(jsonFile));
    }

    getFile(fileId: string): FileJsonDTO {
        return JSON.parse(localStorage.getItem(fileId));
    }

}
