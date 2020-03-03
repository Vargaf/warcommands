import { Injectable } from '@angular/core';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';
import { SaveFileRepositoryService } from 'src/warcommands/commands/domain/file/services/save-file-repository.service';
import { FromJsonFileToFileDTOGeneratorService } from './from-json-file-to-file-dto-generator.service';
import { FileRepositoryService } from 'src/warcommands/commands/domain/file/services/file-repository.service';
import { FileJsonDTO, CommandContainerJsonDTO, CommandJsonDTO } from 'src/warcommands/commands/domain/file/model/file-json.dto';
import { CommandContainerRepositoryService } from 'src/warcommands/commands/domain/command-container/services/command-container-repository.service';
import { CommandContainerDTO } from 'src/warcommands/commands/domain/command-container/model/command-container.dto';
import { CommandInterface } from 'src/warcommands/commands/domain/command/model/command.interface';
import { CommandDataFromJSONFactory } from 'src/warcommands/commands/domain/command-panel/services/command-data-from-JSON.factory';
import { CommandRepositoryService } from 'src/warcommands/commands/domain/command/services/command-repository.service';

@Injectable({
    providedIn: 'root'
})
export class OpenFileService {

    constructor(
        private readonly saveFileRepositoryService: SaveFileRepositoryService,
        private readonly fileRepositoryService: FileRepositoryService,
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService
    ) {}

    openFile(fileId: string): FileDTO {

        const rawFile: FileJsonDTO = this.saveFileRepositoryService.getFile(fileId);
        const file: FileDTO = FromJsonFileToFileDTOGeneratorService.generateFileDTO(rawFile);
        this.fileRepositoryService.addFile(file);

        this.loadCommandContainer(file.id, rawFile.commandContainer);

        return file;

    }

    private loadCommandContainer(fileId: string, rawCommandContainer: CommandContainerJsonDTO): void {

        const commandContainer: CommandContainerDTO = {
            id: rawCommandContainer.id,
            fileId,
            commands: []
        };

        this.commandContainerRepositoryService.saveCommandContainer(commandContainer);

        this.loadCommandList(fileId, rawCommandContainer);
    }

    private loadCommandList(fileId: string, rawCommandContainer: CommandContainerJsonDTO): void {
        // tslint:disable-next-line: forin
        for (const index in rawCommandContainer.commands) {
            this.loadCommand(fileId, +index, rawCommandContainer.commands[index], rawCommandContainer.id);
        }
    }

    private loadCommand(fileId: string, index: number, rawCommand: CommandJsonDTO, commandContainerId: string): void {

        const command: CommandInterface = CommandDataFromJSONFactory.getCommand(rawCommand, fileId, commandContainerId);

        this.commandContainerRepositoryService.addCommandToCommandContainer(command, index);
        this.commandRepositoryService.saveCommand(command);

        for (const rawCommandContainer of rawCommand.commandContainerList) {
            this.loadCommandContainer(fileId, rawCommandContainer);
        }
    }

}
