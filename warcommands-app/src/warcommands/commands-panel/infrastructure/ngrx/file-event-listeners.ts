import { Injectable } from '@angular/core';
import { FileNgrxRepositoryService } from './file-ngrx-repository.service';
import { FileManagerEvents } from '../../domain/file/services/file-manager.events';
import { FileDTO } from '../../domain/file/model/file.dto';

@Injectable({
    providedIn: 'root'
})
export class FileEventListeners {

    constructor(
        private readonly fileNgrxRepositoryService: FileNgrxRepositoryService,
        private readonly fileManagerEvents: FileManagerEvents
    ) {
        this.fileManagerEvents.fileLoadedListener().subscribe((file) => {
            this.loadFile(file);
        });
    }

    private loadFile(file: FileDTO): void {
        this.fileNgrxRepositoryService.loadFile(file);
    }

}
