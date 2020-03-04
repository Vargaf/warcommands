import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as FileSelectors from 'src/ngrx/commands-panel/file/selectors';
import * as FileActions from 'src/ngrx/commands-panel/file/actions';
import { FileDTO } from '../../domain/file/model/file.dto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileNgrxRepositoryService {

    constructor(
        private readonly store: Store<FileSelectors.FileSelectorState>
    ) {}

    loadFile(file: FileDTO): void {
        this.store.dispatch(FileActions.loadFile({ file }));
    }

    getFile(fileId: string): Observable<FileDTO> {
        return this.store.pipe(select(FileSelectors.fileSelector, { fileId }));
    }

    getFileList(): Observable<FileDTO[]> {
        return this.store.pipe(select(FileSelectors.fileListSelector));
    }
}
