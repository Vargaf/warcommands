import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandsComponent } from './commands.component';
import { SetVariableComponent } from './set-variable/set-variable.component';
import { IfThenComponent } from './if-then/if-then.component';
import { IfThenElseComponent } from './if-then-else/if-then-else.component';
import { GameLoopComponent } from './game-loop/game-loop.component';
import { VariableComponent } from './variable/variable.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { CommandDragDropManagerService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service';
import { CommandDropRepository } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-drop-repository.service';
import { AngularCommandDropRepositoryService } from 'src/warcommands/commands-panel/infrastructure/angular/command-drag-drop/angular-command-drop-repository.service';
import { CommandListDragDropManagerService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-list-drag-drop-manager.service';
import { AngularCommandDraggableElementRepositoryService } from 'src/warcommands/commands-panel/infrastructure/angular/command-drag-drop/angular-command-draggable-element-repository.service';
import { CommandDraggableElementRepositoryService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/command-draggable-element-repository.service';
import { CommandComponentManagerService } from 'src/warcommands/commands-panel/domain/command-component/services/command-component-manager.service';
import { CommandContainerDragDropManagerService } from 'src/warcommands/commands-panel/domain/command-container/services/command-container-drag-drop-manager.service';
import { CommandDropModule } from '../command-drop/command-drop.module';
import { DragCustomPreviewService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/drag-custom-preview.service';
import { CommandDropRemoveManagerService } from 'src/warcommands/commands-panel/domain/command/services/command-drop-remove-manager.service';
import { CommandRemovalEventChainGeneratorService } from 'src/warcommands/commands-panel/domain/command/services/command-removal-event-chain-generator.service';
import { GameCommandModule } from './game-command/game-command.module';
import { DragPreviewsModule } from '../drag-previews/drag-previews.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SetVariableFromCommandComponent } from './set-variable-from-command/set-variable-from-command.component';
import { LogicOperatorCommandComponent } from './logic-operator-command/logic-operator-command.component';
import { VariableInScopeFinderService } from 'src/warcommands/commands-panel/domain/command/model/variable/services/variables-in-scope-finder.service';



@NgModule({
    declarations: [
        CommandsComponent,
        SetVariableComponent,
        IfThenComponent,
        IfThenElseComponent,
        GameLoopComponent,
        VariableComponent,
        SetVariableFromCommandComponent,
        LogicOperatorCommandComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        DragPreviewsModule,
        CommandDropModule,
        GameCommandModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ],
    providers: [
        CommandDragDropManagerService,
        CommandListDragDropManagerService,
        CommandComponentManagerService,
        CommandContainerDragDropManagerService,
        DragCustomPreviewService,
        CommandDropRemoveManagerService,
        CommandRemovalEventChainGeneratorService,
        VariableInScopeFinderService,
        { provide: CommandDropRepository, useClass: AngularCommandDropRepositoryService },
        { provide: CommandDraggableElementRepositoryService, useClass: AngularCommandDraggableElementRepositoryService }
    ],
    exports: [
        CommandsComponent,
    ],
    entryComponents: [
        SetVariableComponent,
        IfThenComponent,
        IfThenElseComponent,
        GameLoopComponent,
        VariableComponent,
        SetVariableFromCommandComponent,
        LogicOperatorCommandComponent
    ]
})
export class CommandsModule { }
