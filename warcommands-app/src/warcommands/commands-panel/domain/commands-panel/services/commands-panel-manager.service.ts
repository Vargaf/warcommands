import { Injectable } from '@angular/core';
import { FileEventListeners } from 'src/warcommands/commands-panel/infrastructure/ngrx/file-event-listeners';
import { FileManagerService } from '../../file/services/file-manager.service';

@Injectable({
    providedIn: 'root'
})
export class CommandsPanelManagerService {

    constructor(
        private readonly fileEventListeners: FileEventListeners,
        private readonly fileManagerService: FileManagerService
    ) {
        this.fileEventListeners.initialize();
    }

    loadOpennedFiles(): void {
        this.fileManagerService.loadOpennedFiles();
    }

}