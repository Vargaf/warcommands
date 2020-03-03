import { Injectable } from '@angular/core';
import { FileRepositoryService } from 'src/warcommands/commands/domain/file/services/file-repository.service';
import { Store, select } from '@ngrx/store';
import * as UserFileSelectors from 'src/ngrx/commands-panel/file/selectors';
import * as UserFilesActions from 'src/ngrx/commands-panel/file/actions';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileNgrxRepositoryService implements FileRepositoryService {

    constructor(
        private readonly store: Store<UserFileSelectors.FileSelectorState>
    ) {}

    addFile(file: FileDTO): void {
        this.store.dispatch(UserFilesActions.addFile({ file }));
    }

    loadFiles(fileList: FileDTO[]): void {
        this.store.dispatch(UserFilesActions.loadFiles({ fileList }));
    }

    getFile(fileId: string): Observable<FileDTO> {
        return this.store.pipe(select(UserFileSelectors.fileSelector, { fileId }));
    }

    getFileList(): Observable<FileDTO[]> {
        return this.store.pipe(select(UserFileSelectors.getFileList));
    }
}
