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
import { CommandEnterPredicateAvalabilityService } from 'src/warcommands/commands-panel/domain/command-container/services/command-enter-predicate-availability.service';
import { CommandDropModule } from '../command-drop/command-drop.module';
import { DragCustomPreviewService } from 'src/warcommands/commands-panel/domain/command-drag-drop/services/drag-custom-preview.service';
import { CommandDropRemoveManagerService } from 'src/warcommands/commands-panel/domain/command/services/command-drop-remove-manager.service';
import { CommandDropCancelManagerService } from 'src/warcommands/commands-panel/domain/command/services/command-drop-cancel-manager.service';
import { CommandRemovalEventChainGeneratorService } from 'src/warcommands/commands-panel/domain/command/services/command-removal-event-chain-generator.service';
import { GameCommandModule } from './game-command/game-command.module';
import { DragPreviewsModule } from '../drag-previews/drag-previews.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SetVariableFromCommandComponent } from './set-variable-from-command/set-variable-from-command.component';
import { LogicOperatorCommandComponent } from './logic-operator-command/logic-operator-command.component';
import { VariableInScopeFinderService } from 'src/warcommands/commands-panel/domain/command/model/variable/services/variables-in-scope-finder.service';
import { GetClassNameFromCommandService } from 'src/warcommands/commands-panel/domain/command/model/set-variable-from-command/get-class-name-from-command.service';
import { ClassMemberDirective } from './class-member.directive';
import { ClassMemberComponentFactory } from 'src/warcommands/commands-panel/domain/command/services/class-member-component/class-member-component-factory.service';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';
import { MixinsModule } from 'src/app/commands-panel/commands/mixins/mixins.module';
import { UniqueVarNameValidator } from 'src/warcommands/commands-panel/infrastructure/angular/commands/unique-var-name.validator';



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
        ClassMemberDirective
    ],
    imports: [
        CommonModule,
        MaterialModule,
        DragPreviewsModule,
        CommandDropModule,
        GameCommandModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MixinsModule,
    ],
    providers: [
        CommandDragDropManagerService,
        CommandListDragDropManagerService,
        CommandEnterPredicateAvalabilityService,
        CommandComponentManagerService,
        CommandContainerDragDropManagerService,
        DragCustomPreviewService,
        CommandDropRemoveManagerService,
        CommandDropCancelManagerService,
        CommandRemovalEventChainGeneratorService,
        VariableInScopeFinderService,
        GetClassNameFromCommandService,
        ClassMemberComponentFactory,
        CommandPathFinderService,
        CommandPathErrorManagerService,
        UniqueVarNameValidator,
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
