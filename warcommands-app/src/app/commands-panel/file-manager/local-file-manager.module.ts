import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerService } from 'src/warcommands/commands/domain/file-manager/services/file-manager.service';
import { LocalFileManagerService } from 'src/warcommands/commands/infrastructure/local-storage/file/local-file-manager.service';
import { UserFilesRepositoryService } from 'src/warcommands/commands/domain/file/services/user-files-repository.service';
import { UserLocalFilesRepositoryService } from 'src/warcommands/commands/infrastructure/local-storage/file/user-local-files-repository.service';
import { FileRepositoryService } from 'src/warcommands/commands/domain/file/services/file-repository.service';
import { FileNgrxRepositoryService } from 'src/warcommands/commands/infrastructure/ngrx/file/file-ngrx-repository.service';
import { OpenFileService } from 'src/warcommands/commands/infrastructure/local-storage/file/open-file.service';
import { InitializeMainPageService } from 'src/warcommands/commands/domain/file-manager/services/initialize-main-page.service';
import { LocalFileInitializeMainPageService } from 'src/warcommands/commands/infrastructure/local-storage/file/local-file-initialize-main-page.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: FileManagerService, useClass: LocalFileManagerService },
    { provide: UserFilesRepositoryService, useClass: UserLocalFilesRepositoryService },
    { provide: FileRepositoryService, useClass: FileNgrxRepositoryService },
    { provide: InitializeMainPageService, useClass: LocalFileInitializeMainPageService },
    OpenFileService,
  ],
  exports: []
})
export class LocalFileManagerModule { }
