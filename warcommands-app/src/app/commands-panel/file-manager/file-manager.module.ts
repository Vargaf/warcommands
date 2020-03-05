import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './file-manager.component';
import { FileComponent } from './file/file.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileManagerService } from 'src/warcommands/commands-panel/domain/file/services/file-manager.service';
import { FileManagerLocalStorageModule } from './file-manager-local-storege.module';
import { CommandsPanelManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/commands-panel-manager.service';
import { CommandContainerManagerService } from 'src/warcommands/commands-panel/domain/command-container/services/command-container-manager.service';



@NgModule({
    declarations: [
        FileManagerComponent,
        FileComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FileManagerLocalStorageModule
    ],
    providers: [
        FileManagerService,
        CommandContainerManagerService,
        CommandsPanelManagerService,
    ],
    exports: [
        FileManagerComponent
    ]
})
export class FileManagerModule {}
