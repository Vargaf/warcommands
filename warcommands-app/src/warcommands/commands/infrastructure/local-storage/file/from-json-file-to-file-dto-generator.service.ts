import { Injectable } from '@angular/core';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';
import { FileJsonDTO } from 'src/warcommands/commands/domain/file/model/file-json.dto';

@Injectable({
    providedIn: 'root'
})
export class FromJsonFileToFileDTOGeneratorService {

    static generateFileDTO(jsonFile: FileJsonDTO): FileDTO {

        const fileDTO: FileDTO = {
            id: jsonFile.id,
            isMain: jsonFile.isMain,
            name: jsonFile.name,
            commandContainerId: jsonFile.commandContainer.id
        };

        return fileDTO;
    }

}
