import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandDropComponent } from './command-drop.component';
import { CommandDirective } from '../command.directive';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
    declarations: [
        CommandDropComponent,
        CommandDirective
    ],
    imports: [
        CommonModule,
        FlexLayoutModule
    ],
    exports: [
        CommandDropComponent
    ]
})
export class CommandDropModule { }
