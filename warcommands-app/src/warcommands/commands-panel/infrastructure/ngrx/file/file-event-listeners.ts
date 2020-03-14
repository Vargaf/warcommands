import { Injectable } from '@angular/core';
import { FileNgrxRepositoryService } from './file-ngrx-repository.service';
import { FileManagerEvents } from '../../../domain/file/services/file-manager.events';

@Injectable({
    providedIn: 'root'
})
export class FileEventListeners {

    constructor(
        private readonly fileNgrxRepositoryService: FileNgrxRepositoryService,
        private readonly fileManagerEvents: FileManagerEvents,
    ) {
        this.onFileLoadedAddItToStore();
    }

    private onFileLoadedAddItToStore(): void {
        this.fileManagerEvents.fileLoadedListener().subscribe((file) => {
            this.fileNgrxRepositoryService.loadFile(file);
        });
    }

}
