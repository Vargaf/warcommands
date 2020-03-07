import { NgModule } from '@angular/core';
import { FileRepositoryService } from 'src/warcommands/commands-panel/domain/file/services/file-repository.service';
import { LocalStorageFileRepositoryService } from 'src/warcommands/commands-panel/infrastructure/local-storege/file/local-storage-file-repository.service';
import { LocalStorageCommandComponentRepositoryService } from 'src/warcommands/commands-panel/infrastructure/local-storege/command-component/local-storage-command-component-repository.service';
import { CommandComponentRepositoryService } from 'src/warcommands/commands-panel/domain/command-component/services/command-component-repository.service';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        { provide: FileRepositoryService, useClass: LocalStorageFileRepositoryService },
        { provide: CommandComponentRepositoryService, useClass: LocalStorageCommandComponentRepositoryService }
    ],
    exports: []
})
export class FileManagerLocalStorageModule { }
