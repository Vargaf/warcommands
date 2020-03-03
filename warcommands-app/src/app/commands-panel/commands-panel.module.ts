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
import { SaveFileRepositoryService } from 'src/warcommands/commands/domain/file/services/save-file-repository.service';
import { SaveFileLocalStorageRepositorySerice } from 'src/warcommands/commands/infrastructure/local-storage/file/save-file-local-storage-repository.service';
import { FromJsonFileToFileDTOGeneratorService } from 'src/warcommands/commands/infrastructure/local-storage/file/from-json-file-to-file-dto-generator.service';
import { LocalFileManagerModule } from './file-manager/local-file-manager.module';
import { FileComponent } from './file/file.component';
import { CreateCommandComponentService } from 'src/warcommands/commands/domain/command-panel/services/create-command-component.service';
import { CommandDropContainerManager } from 'src/warcommands/commands/domain/command-panel/services/command-drop-container-manager.service';
import { CommandDropedHelperService } from 'src/warcommands/commands/domain/command-panel/services/command-droped-helper.service';



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
    FileComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    LocalFileManagerModule,
    StoreModule.forFeature(CommandsPanelStore.CommandsPanelStoreKey, CommandsPanelStore.COMMANDS_FILE_REDUCER_MAP_TOKEN),
  ],
  exports: [
    CommandsPanelComponent
  ],
  providers: [
    { provide: CommandsPanelStore.COMMANDS_FILE_REDUCER_MAP_TOKEN, useFactory: CommandsPanelStore.reducers },
    { provide: CommandContainerRepositoryService, useClass: CommandContainerNgrxRepositoryService },
    { provide: CommandRepositoryService, useClass: CommandNgrxRepositoryService },
    { provide: SaveFileRepositoryService, useClass: SaveFileLocalStorageRepositorySerice },
    AddCommandComponentService,
    CommandsComponentFactory,
    CommandsDragDropRepositoy,
    CommandContainerDragDropService,
    CommandDragDropService,
    CommandDataDragDropService,
    CommandDataFactory,
    MouseDragDropHelperService,
    CommandListDragDropService,
    FromJsonFileToFileDTOGeneratorService,
    CreateCommandComponentService,
    CommandDropContainerManager,
    CommandDropedHelperService
  ],
  entryComponents: [
    CreateMinionComponent,
    VariableComponent,
    SetVariableComponent,
    IfThenComponent,
    IfThenElseComponent,
    GameLoopComponent
  ]
})
export class CommandsPanelModule { }
