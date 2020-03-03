import { Injectable } from '@angular/core';
import { FileManagerService } from 'src/warcommands/commands/domain/file-manager/services/file-manager.service';
import { UserFilesRepositoryService } from 'src/warcommands/commands/domain/file/services/user-files-repository.service';
import { UserFileDTO } from 'src/warcommands/commands/domain/file/model/user-file.dto';
import { FileRepositoryService } from 'src/warcommands/commands/domain/file/services/file-repository.service';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';
import { CommandContainerRepositoryService } from 'src/warcommands/commands/domain/command-container/services/command-container-repository.service';
import { JsonFileGeneratorService } from './json-file-generator.service';
import { SaveFileRepositoryService } from 'src/warcommands/commands/domain/file/services/save-file-repository.service';
import { FileJsonDTO } from 'src/warcommands/commands/domain/file/model/file-json.dto';
import { OpenFileService } from './open-file.service';
import { InitializeMainPageService } from 'src/warcommands/commands/domain/file-manager/services/initialize-main-page.service';

@Injectable({
    providedIn: 'root'
})
export class LocalFileManagerService implements FileManagerService {

    constructor(
        private readonly userFilesRepositoryService: UserFilesRepositoryService,
        private readonly fileRepositoryService: FileRepositoryService,
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService,
        private readonly saveFileRepositoryService: SaveFileRepositoryService,
        private readonly openFileService: OpenFileService,
        private readonly initializeMainPageService: InitializeMainPageService
    ) {}

    loadOppenedFiles(): FileDTO[] {
        const userOppenedFiles: UserFileDTO[] = this.getOppenedFiles();

        let oppenedFiles: FileDTO[] = [];

        if (this.isInitialitzationNeeded(userOppenedFiles)) {
            oppenedFiles = this.initializeMainPageService.initialize();
        } else {
            oppenedFiles = this.loadFiles(userOppenedFiles);
        }

        return oppenedFiles;
    }

    saveFile(fileId: string): void {
        this.fileRepositoryService.getFile(fileId).subscribe((file) => {
            this.getFileCommandContainers(file);
        }).unsubscribe();
    }

    removeFile(): void {
        throw new Error('Method not implemented.');
    }

    openFile(fileId: string): FileDTO {
        return this.openFileService.openFile(fileId);
    }

    private loadFiles(userOppenedFiles: UserFileDTO[]): FileDTO[] {
        const files: FileDTO[] = [];

        for (const userFile of userOppenedFiles) {
            const loadedFile = this.openFile(userFile.id);
            files.push(loadedFile);
        }

        return files;
    }

    private isInitialitzationNeeded(userOppenedFiles: UserFileDTO[]): boolean {
        const userFiles: UserFileDTO[] = this.userFilesRepositoryService.getUserFileList();
        return userOppenedFiles.length === 0 && userFiles.length === 0;
    }

    private getOppenedFiles(): UserFileDTO[] {
        const userFiles: UserFileDTO[] = this.userFilesRepositoryService.getUserFileList();

        let oppenedFiles: UserFileDTO[] = [];
        if (userFiles) {
            oppenedFiles = userFiles.filter((file) => {
                return file.isOppenedOnCommandPanel === true;
            });
        }

        return oppenedFiles;
    }

    private getFileCommandContainers(file: FileDTO): void {
        this.commandContainerRepositoryService.getCommandContainerOnPage(file.id).subscribe(( commandContainerList ) => {
            const generatedFIle = JsonFileGeneratorService.buildFileJson(file, commandContainerList);
            this.saveJsonFile(generatedFIle);
        }).unsubscribe();
    }

    private saveJsonFile(file: FileJsonDTO): void {
        this.saveFileRepositoryService.saveFile(file);

        const userFile: UserFileDTO = {
            id: file.id,
            isOppenedOnCommandPanel: true,
            name: file.name
        };

        this.userFilesRepositoryService.addFileToUserFileList(userFile);
    }

}
