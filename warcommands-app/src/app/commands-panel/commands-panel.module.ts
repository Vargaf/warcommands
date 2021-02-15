import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommandsPanelComponent } from './commands-panel.component';
import { CommandsModule } from './commands/commands.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { StoreModule } from '@ngrx/store';
import * as CommandsPanelStore from 'src/ngrx/commands-panel/reducer-map';
import { StoreListenersModule } from './store-listeners/store-listeners.module';
import { ToggleCommandsPanelService } from 'src/warcommands/commands-panel/domain/commands-panel/services/toggle-commands-panel.service';
import { MaterialModule } from '../share/material/material.module';

@NgModule({
    declarations: [
        CommandsPanelComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        CommandsModule,
        FileManagerModule,
        StoreListenersModule,
        MaterialModule,
        StoreModule.forFeature(CommandsPanelStore.CommandsPanelStoreKey, CommandsPanelStore.COMMANDS_FILE_REDUCER_MAP_TOKEN),
    ],
    providers: [
        ToggleCommandsPanelService,
        { provide: CommandsPanelStore.COMMANDS_FILE_REDUCER_MAP_TOKEN, useFactory: CommandsPanelStore.reducers },
    ],
    exports: [
        CommandsPanelComponent
    ]
})
export class CommandsPanelModule { }
