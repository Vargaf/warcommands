import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommandsPanelComponent } from './commands-panel.component';
import { GameLoopComponent } from './game-loop/game-loop.component';
import { MaterialModule } from '../share/material/material.module';
import { CreateMinionComponent } from './create-minion/create-minion.component';
import { CommandDirective } from './command.directive';
import { StoreModule } from '@ngrx/store';
import * as CommandsPanelStore from 'src/ngrx/commands-panel/reducer-map';
import { FileRepositoryService } from 'src/warcommands/commands/domain/file/services/FileRepository.service';
import { FileNgrxRepositoryService } from 'src/warcommands/commands/infrastructure/ngrx/file/file-ngrx-repository.service';
import { AddCommandComponentService } from 'src/warcommands/commands/domain/command-panel/services/add-command-component.service';
import { CommandsComponentFactory } from 'src/warcommands/commands/domain/command-panel/services/commands-component-factory.service';
import { VariableComponent } from './variable/variable.component';
import { IfThenComponent } from './if-then/if-then.component';
import { IfThenElseComponent } from './if-then-else/if-then-else.component';
import { SetVariableComponent } from './set-variable/set-variable.component';
import { CommandDropComponent } from './command-drop/command-drop.component';
import { CommandsDragDropRepositoy } from 'src/warcommands/commands/infrastructure/angular/drag-drop/commands-drag-drop.repository';
import { CommandContainerRepositoryService } from 'src/warcommands/commands/domain/command-container/services/command-container-repository.service';
import { CommandContainerNgrxRepositoryService } from 'src/warcommands/commands/infrastructure/ngrx/command-container/command-container-ngrx-repository.service';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands/infrastructure/ngrx/command/command-ngrx-repository.service';
import { CommandRepositoryService } from 'src/warcommands/commands/domain/command/services/command-repository.service';
import { CommandContainerDragDropService } from 'src/warcommands/commands/domain/command-panel/services/command-container-drag-drop.service';
import { CommandListDragDropService } from 'src/warcommands/commands/domain/command-panel/services/command-list-drag-drop.service';
import { CommandDragDropService } from 'src/warcommands/commands/domain/command-panel/services/command-drag-drop.service';
import { CommandDataDragDropService } from 'src/warcommands/commands/domain/command-panel/services/command-data-drag-drop.service';
import { CommandDataFactory } from 'src/warcommands/commands/domain/command-panel/services/command-data.factory';
import { MouseDragDropHelperService } from 'src/warcommands/commands/domain/command-panel/services/mouse-drag-drop-helper.service';
import { FilesComponent } from './files/files.component';



@NgModule({
  declarations: [
    CommandsPanelComponent,
    GameLoopComponent,
    CommandDirective,
    CreateMinionComponent,
    VariableComponent,
    IfThenComponent,
    IfThenElseComponent,
    SetVariableComponent,
    CommandDropComponent,
    FilesComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    StoreModule.forFeature(CommandsPanelStore.CommandsPanelStoreKey, CommandsPanelStore.COMMANDS_FILE_REDUCER_MAP_TOKEN),
  ],
  exports: [
    CommandsPanelComponent
  ],
  providers: [
    { provide: CommandsPanelStore.COMMANDS_FILE_REDUCER_MAP_TOKEN, useFactory: CommandsPanelStore.reducers },
    { provide: FileRepositoryService, useClass: FileNgrxRepositoryService },
    { provide: CommandContainerRepositoryService, useClass: CommandContainerNgrxRepositoryService },
    { provide: CommandRepositoryService, useClass: CommandNgrxRepositoryService },
    AddCommandComponentService,
    CommandsComponentFactory,
    CommandsDragDropRepositoy,
    CommandContainerDragDropService,
    CommandDragDropService,
    CommandDataDragDropService,
    CommandDataFactory,
    MouseDragDropHelperService,
    CommandListDragDropService
  ],
  entryComponents: [
    CreateMinionComponent,
    VariableComponent,
    SetVariableComponent,
    IfThenComponent,
    IfThenElseComponent
  ]
})
export class CommandsPanelModule { }
