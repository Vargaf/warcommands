import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CommandsPanelComponent} from './commands-panel.component';
import {
    UxUiNgrxRepositoryService
} from "../../warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service";
import {of} from "rxjs";
import {CommandsComponent} from "./commands/commands.component";
import {
    CommandListDragDropManagerService
} from "../../warcommands/commands-panel/domain/command-drag-drop/services/command-list-drag-drop-manager.service";
import {
    CommandContainerDragDropManagerService
} from "../../warcommands/commands-panel/domain/command-container/services/command-container-drag-drop-manager.service";
import {
    CommandComponentManagerService
} from "../../warcommands/commands-panel/domain/command-component/services/command-component-manager.service";
import {
    CommandDropRemoveManagerService
} from "../../warcommands/commands-panel/domain/command/services/command-drop-remove-manager.service";
import {
    CommandDropCancelManagerService
} from "../../warcommands/commands-panel/domain/command/services/command-drop-cancel-manager.service";
import {FileManagerComponent} from "./file-manager/file-manager.component";
import {
    CommandContainerManagerService
} from "../../warcommands/commands-panel/domain/command-container/services/command-container-manager.service";
import {FileRepositoryService} from "../../warcommands/commands-panel/domain/file/services/file-repository.service";
import {CommandManagerService} from "../../warcommands/commands-panel/domain/command/services/command-manager.service";
import {
    InitializeMainPageService
} from "../../warcommands/commands-panel/domain/file/services/initialize-main-page.service";
import {
    JSONFileGeneratorService
} from "../../warcommands/commands-panel/domain/file/services/json-file-generator.service";
import {GameCommandPreviewComponent} from "./drag-previews/game-command-preview/game-command-preview.component";
import {SetVariablePreviewComponent} from "./drag-previews/set-variable-preview/set-variable-preview.component";
import {
    SetVariableFromCommandPreviewComponent
} from "./drag-previews/set-variable-from-command-preview/set-variable-from-command-preview.component";
import {VariablePreviewComponent} from "./drag-previews/variable-preview/variable-preview.component";
import {IfThenPreviewComponent} from "./drag-previews/if-then-preview/if-then-preview.component";
import {
    LogicOperatorCommandPreviewComponent
} from "./drag-previews/logic-operator-command-preview/logic-operator-command-preview.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";

describe('CommandsPanelComponent', () => {
    let component: CommandsPanelComponent;
    let fixture: ComponentFixture<CommandsPanelComponent>;

    let uxUiNgrxRepositoryServiceSpy;

    let commandListDragDropManagerServiceSpy;
    let commandContainerDragDropManagerServiceSpy;
    let commandComponentManagerServiceSpy;
    let commandDropRemoveManagerServiceSpy;
    let commandDropCancelManagerServiceSpy;

    let commandContainerManagerServiceSpy;
    let fileRepositoryServiceSpy;
    let commandManagerServiceSpy;
    let initializeMainPageServiceSpy;
    let jsonFileGeneratorServiceSpy;

    beforeEach(waitForAsync(() => {
        uxUiNgrxRepositoryServiceSpy = jasmine.createSpyObj('UxUiNgrxRepositoryService', ['watchIsUserDraggingACommandFromCommandList'])
        uxUiNgrxRepositoryServiceSpy.watchIsUserDraggingACommandFromCommandList.and.returnValue(of('nothing'));

        commandListDragDropManagerServiceSpy = jasmine.createSpyObj('CommandListDragDropManagerService', ['createCommandListDrop', 'addDraggableItem']);
        commandContainerDragDropManagerServiceSpy = jasmine.createSpyObj('CommandContainerDragDropManagerService', ['a']);
        commandComponentManagerServiceSpy = jasmine.createSpyObj('CommandComponentManagerService', ['a']);
        commandDropRemoveManagerServiceSpy = jasmine.createSpyObj('CommandDropRemoveManagerService', ['createDeleteCommandDropContainer']);
        commandDropCancelManagerServiceSpy = jasmine.createSpyObj('CommandDropCancelManagerService', ['createCancelCommandDropContainer']);

        commandContainerManagerServiceSpy = jasmine.createSpyObj('CommandContainerManagerService', ['a']);
        fileRepositoryServiceSpy = jasmine.createSpyObj('FileRepositoryService', ['userHasFiles']);
        commandManagerServiceSpy = jasmine.createSpyObj('CommandManagerService', ['a']);
        initializeMainPageServiceSpy = jasmine.createSpyObj('InitializeMainPageService', ['initialize']);
        jsonFileGeneratorServiceSpy = jasmine.createSpyObj('JSONFileGeneratorService', ['a']);

        TestBed.configureTestingModule({
            declarations: [
                CommandsPanelComponent,
                CommandsComponent,
                FileManagerComponent,
                GameCommandPreviewComponent,
                SetVariablePreviewComponent,
                SetVariableFromCommandPreviewComponent,
                VariablePreviewComponent,
                IfThenPreviewComponent,
                LogicOperatorCommandPreviewComponent,
            ],
            imports: [MatIconModule, MatTabsModule],
            providers: [
                {provide: UxUiNgrxRepositoryService, useValue: uxUiNgrxRepositoryServiceSpy},
                {provide: CommandListDragDropManagerService, useValue: commandListDragDropManagerServiceSpy},
                {provide: CommandContainerDragDropManagerService, useValue: commandContainerDragDropManagerServiceSpy},
                {provide: CommandComponentManagerService, useValue: commandComponentManagerServiceSpy},
                {provide: CommandDropRemoveManagerService, useValue: commandDropRemoveManagerServiceSpy},
                {provide: CommandDropCancelManagerService, useValue: commandDropCancelManagerServiceSpy},
                {provide: CommandContainerManagerService, useValue: commandContainerManagerServiceSpy},
                {provide: FileRepositoryService, useValue: fileRepositoryServiceSpy},
                {provide: CommandManagerService, useValue: commandManagerServiceSpy},
                {provide: InitializeMainPageService, useValue: initializeMainPageServiceSpy},
                {provide: JSONFileGeneratorService, useValue: jsonFileGeneratorServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommandsPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
