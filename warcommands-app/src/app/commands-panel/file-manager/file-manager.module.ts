import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './file-manager.component';
import { FileComponent } from './file/file.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileManagerService } from 'src/warcommands/commands-panel/domain/file/services/file-manager.service';
import { FileManagerLocalStorageModule } from './file-manager-local-storege.module';
import { FileEventListeners } from 'src/warcommands/commands-panel/infrastructure/ngrx/file-event-listeners';



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
        FileManagerService
    ],
    exports: [
        FileManagerComponent
    ]
})
export class FileManagerModule {

    constructor(private readonly fileEventListeners: FileEventListeners) {

    }

}
