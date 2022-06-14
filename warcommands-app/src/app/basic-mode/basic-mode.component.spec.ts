import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BasicModeComponent} from './basic-mode.component';
import {GameMiddlewareService} from "../../warcommands/game-middleware/game-middleware.service";
import {
    CurrentPlayerManagerService
} from "../../warcommands/commands-panel/domain/current-player/current-player-manager-service";
import {BasicModeGameEngineService} from "../../warcommands/basic-mode/game-engine-basic-mode.service";
import {CurrentPlayerDTO} from "../../warcommands/commands-panel/domain/current-player/model/current-player.dto";
import {
    GameClassMemberOptionsListComponent
} from "../commands-panel/class-definition/game/game-class-member-options-list/game-class-member-options-list.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CommandsPanelComponent} from "../commands-panel/commands-panel.component";
import {
    UxUiNgrxRepositoryService
} from "../../warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service";
import {MatIconModule} from "@angular/material/icon";
import {StatsComponent} from "./stats/stats.component";
import {CommandsComponent} from "../commands-panel/commands/commands.component";
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
    CommandDragDropManagerService
} from "../../warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service";
import {of} from "rxjs";
import {FileManagerComponent} from "../commands-panel/file-manager/file-manager.component";
import {
    CommandsPanelManagerService
} from "../../warcommands/commands-panel/domain/commands-panel/services/commands-panel-manager.service";
import {
    GameCommandPreviewComponent
} from "../commands-panel/drag-previews/game-command-preview/game-command-preview.component";
import {
    SetVariablePreviewComponent
} from "../commands-panel/drag-previews/set-variable-preview/set-variable-preview.component";
import {VariablePreviewComponent} from "../commands-panel/drag-previews/variable-preview/variable-preview.component";
import {
    IfThenElsePreviewComponent
} from "../commands-panel/drag-previews/if-then-else-preview/if-then-else-preview.component";
import {IfThenPreviewComponent} from "../commands-panel/drag-previews/if-then-preview/if-then-preview.component";
import {
    LogicOperatorCommandPreviewComponent
} from "../commands-panel/drag-previews/logic-operator-command-preview/logic-operator-command-preview.component";
import {MatTabsModule} from "@angular/material/tabs";
import {
    SetVariableFromCommandPreviewComponent
} from "../commands-panel/drag-previews/set-variable-from-command-preview/set-variable-from-command-preview.component";
import {FlexLayoutModule} from "@angular/flex-layout";

describe('BasicModeComponent', () => {
    let component: BasicModeComponent;
    let fixture: ComponentFixture<BasicModeComponent>;

    let gameMiddlewareServiceSpy;
    let currentPlayerManagerServiceSpy;
    let basicModeGameEngineServiceSpy;
    let uxUiNgrxRepositoryServiceSpy;
    let commandListDragDropManagerServiceSpy;
    let commandContainerDragDropManagerServiceSpy;
    let commandComponentManagerServiceSpy;
    let commandDragDropManagerServiceSpy;
    let commandsPanelManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        gameMiddlewareServiceSpy = jasmine.createSpyObj('GameMiddlewareService', ['setMap', 'addPlayer', 'addIAPlayer', 'initialize']);
        currentPlayerManagerServiceSpy = jasmine.createSpyObj('CurrentPlayerManagerService', ['initializePlayer']);
        const playerMock: CurrentPlayerDTO = {id: ''};
        currentPlayerManagerServiceSpy.initializePlayer.and.returnValue(playerMock);
        basicModeGameEngineServiceSpy = jasmine.createSpyObj('BasicModeGameEngineService', ['setViewContainerRef']);
        uxUiNgrxRepositoryServiceSpy = jasmine.createSpyObj('UxUiNgrxRepositoryService', ['watchIsUserDraggingACommandFromCommandList']);
        uxUiNgrxRepositoryServiceSpy.watchIsUserDraggingACommandFromCommandList.and.returnValue(of(null));
        commandListDragDropManagerServiceSpy = jasmine.createSpyObj('CommandListDragDropManagerService', ['a']);
        commandContainerDragDropManagerServiceSpy = jasmine.createSpyObj('CommandContainerDragDropManagerService', ['a']);
        commandComponentManagerServiceSpy = jasmine.createSpyObj('CommandComponentManagerService', ['a']);
        commandDragDropManagerServiceSpy = jasmine.createSpyObj('CommandDragDropManagerService', ['createCommandListDrop', 'addDraggableElementToCommandList', 'createDeleteCommandDropContainer', 'createCancelCommandDragContainer']);
        commandsPanelManagerServiceSpy = jasmine.createSpyObj('CommandsPanelManagerService', ['loadOpennedFiles']);
        TestBed.configureTestingModule({
            declarations: [
                BasicModeComponent,
                GameClassMemberOptionsListComponent,
                CommandsPanelComponent,
                StatsComponent,
                CommandsComponent,
                FileManagerComponent,
                GameCommandPreviewComponent,
                SetVariablePreviewComponent,
                VariablePreviewComponent,
                IfThenElsePreviewComponent,
                IfThenPreviewComponent,
                LogicOperatorCommandPreviewComponent,
                SetVariableFromCommandPreviewComponent,
            ],
            imports: [MatSidenavModule, NoopAnimationsModule, MatIconModule, MatTabsModule, FlexLayoutModule],
            providers: [
                {provide: GameMiddlewareService, useValue: gameMiddlewareServiceSpy},
                {provide: CurrentPlayerManagerService, useValue: currentPlayerManagerServiceSpy},
                {provide: BasicModeGameEngineService, useValue: basicModeGameEngineServiceSpy},
                {provide: UxUiNgrxRepositoryService, useValue: uxUiNgrxRepositoryServiceSpy},
                {provide: CommandListDragDropManagerService, useValue: commandListDragDropManagerServiceSpy},
                {provide: CommandContainerDragDropManagerService, useValue: commandContainerDragDropManagerServiceSpy},
                {provide: CommandComponentManagerService, useValue: commandComponentManagerServiceSpy},
                {provide: CommandDragDropManagerService, useValue: commandDragDropManagerServiceSpy},
                {provide: CommandsPanelManagerService, useValue: commandsPanelManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicModeComponent);
        component = fixture.componentInstance;
        const viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['a']);
        component.basicModeGraphicsWrapper = {
            viewContainerRef: viewContainerRefMock
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
