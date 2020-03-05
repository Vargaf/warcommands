import { NgModule } from '@angular/core';
import { FileRepositoryService } from 'src/warcommands/commands-panel/domain/file/services/file-repository.service';
import { LocalStorageFileRepositoryService } from 'src/warcommands/commands-panel/infrastructure/local-storege/file/local-storage-file-repository.service';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        { provide: FileRepositoryService, useClass: LocalStorageFileRepositoryService },
    ],
    exports: []
})
export class FileManagerLocalStorageModule { }
