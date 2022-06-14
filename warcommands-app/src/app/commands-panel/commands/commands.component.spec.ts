import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CommandsComponent} from './commands.component';
import {
    CommandDragDropManagerService
} from "../../../warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service";
import {GameCommandPreviewComponent} from "../drag-previews/game-command-preview/game-command-preview.component";
import {SetVariablePreviewComponent} from "../drag-previews/set-variable-preview/set-variable-preview.component";
import {
    SetVariableFromCommandPreviewComponent
} from "../drag-previews/set-variable-from-command-preview/set-variable-from-command-preview.component";
import {IfThenPreviewComponent} from "../drag-previews/if-then-preview/if-then-preview.component";
import {
    LogicOperatorCommandPreviewComponent
} from "../drag-previews/logic-operator-command-preview/logic-operator-command-preview.component";
import {VariablePreviewComponent} from "../drag-previews/variable-preview/variable-preview.component";

describe('CommandsComponent', () => {
    let component: CommandsComponent;
    let fixture: ComponentFixture<CommandsComponent>;

    let commandDragDropManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        commandDragDropManagerServiceSpy = jasmine.createSpyObj('CommandDragDropManagerService', ['createCommandListDrop', 'addDraggableElementToCommandList']);
        TestBed.configureTestingModule({
            declarations: [
                CommandsComponent,
                GameCommandPreviewComponent,
                SetVariablePreviewComponent,
                SetVariableFromCommandPreviewComponent,
                IfThenPreviewComponent,
                LogicOperatorCommandPreviewComponent,
                VariablePreviewComponent
            ],
            providers: [
                {provide: CommandDragDropManagerService, useValue: commandDragDropManagerServiceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommandsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
