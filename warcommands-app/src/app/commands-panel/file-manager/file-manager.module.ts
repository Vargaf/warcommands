import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './file-manager.component';
import { FileComponent } from './file/file.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileManagerService } from 'src/warcommands/commands-panel/domain/file/services/file-manager.service';
import { FileManagerLocalStorageModule } from './file-manager-local-storage.module';
import { CommandsPanelManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/commands-panel-manager.service';
import { CommandContainerManagerService } from 'src/warcommands/commands-panel/domain/command-container/services/command-container-manager.service';
import { CommandManagerService } from 'src/warcommands/commands-panel/domain/command/services/command-manager.service';
import { CommandContainerNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command-container/command-container-ngrx-repository.service';
import { CommandDropModule } from '../command-drop/command-drop.module';
import { MouseDragDropHelperService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/mouse-drag-drop-helper.service';
import { CommandsModule } from '../commands/commands.module';
import { DragPreviewsModule } from '../drag-previews/drag-previews.module';
import { InitializeMainPageService } from 'src/warcommands/commands-panel/domain/file/services/initialize-main-page.service';
import { InMmeoryModule } from '../in-mmeory/in-mmeory.module';
import { JSONFileGeneratorService } from 'src/warcommands/commands-panel/domain/file/services/json-file-generator.service';
import { CommandRepositoryListenersService } from 'src/warcommands/commands-panel/domain/command/services/command-repository-listeners.service';
import { CommandContainerRepositoryListenersService } from 'src/warcommands/commands-panel/domain/command-container/services/command-container-repository-listeners.service';
import { UxUiNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service';



@NgModule({
    declarations: [
        FileManagerComponent,
        FileComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FileManagerLocalStorageModule,
        CommandDropModule,
        CommandsModule,
        DragPreviewsModule,
        InMmeoryModule,
    ],
    providers: [
        FileManagerService,
        CommandContainerManagerService,
        CommandsPanelManagerService,
        CommandManagerService,
        CommandContainerNgrxRepositoryService,
        MouseDragDropHelperService,
        InitializeMainPageService,
        JSONFileGeneratorService,
        CommandRepositoryListenersService,
        CommandContainerRepositoryListenersService,
        UxUiNgrxRepositoryService
    ],
    exports: [
        FileManagerComponent
    ]
})
export class FileManagerModule {

    constructor(
        commandRepositoryListenersService: CommandRepositoryListenersService,
        commandContainerRepositoryListenersService: CommandContainerRepositoryListenersService
    ) {}
}
