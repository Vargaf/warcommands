import { Injectable } from '@angular/core';
import { FileRepositoryService } from 'src/warcommands/commands/domain/file/services/FileRepository.service';
import { Store, select } from '@ngrx/store';
import * as UserProgramSelectors from 'src/ngrx/commands-panel/file/selectors';
import * as UserProgramActions from 'src/ngrx/commands-panel/file/actions';
import { FileDTO } from 'src/warcommands/commands/domain/file/model/file.dto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileNgrxRepositoryService implements FileRepositoryService {

    constructor(
        private readonly store: Store<UserProgramSelectors.FileSelectorState>
    ) {}

    saveFile(file: FileDTO): void {
        this.store.dispatch(UserProgramActions.addFile({ file }));
    }

    getFile(fileId: string): Observable<FileDTO> {
        return this.store.pipe(select(UserProgramSelectors.fileSelector, { fileId }));
    }
}
