import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandDropComponent } from './command-drop.component';
import { CommandDirective } from '../command.directive';



@NgModule({
    declarations: [
        CommandDropComponent,
        CommandDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommandDropComponent
    ]
})
export class CommandDropModule { }
