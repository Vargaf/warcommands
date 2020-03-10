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
        CommandsModule
    ],
    providers: [
        FileManagerService,
        CommandContainerManagerService,
        CommandsPanelManagerService,
        CommandManagerService,
        CommandContainerNgrxRepositoryService,
        MouseDragDropHelperService
    ],
    exports: [
        FileManagerComponent
    ]
})
export class FileManagerModule {}
