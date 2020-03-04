import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './file-manager.component';
import { FileComponent } from './file/file.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
    declarations: [
        FileManagerComponent,
        FileComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        FileManagerComponent
    ]
})
export class FileManagerModule { }
