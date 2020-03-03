import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommandsPanelComponent } from './commands-panel.component';
import { CommandsModule } from './commands/commands.module';



@NgModule({
    declarations: [
        CommandsPanelComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        CommandsModule
    ],
    exports: [
        CommandsPanelComponent
    ]
})
export class CommandsPanelModule { }
