import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CommandsComponent} from './commands.component';
import {
    CommandDragDropManagerService
} from "../../../warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service";

describe('CommandsComponent', () => {
    let component: CommandsComponent;
    let fixture: ComponentFixture<CommandsComponent>;

    let commandDragDropManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        commandDragDropManagerServiceSpy = jasmine.createSpyObj('CommandDragDropManagerService', ['createCommandListDrop', 'addDraggableElementToCommandList']);
        TestBed.configureTestingModule({
            declarations: [CommandsComponent],
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
