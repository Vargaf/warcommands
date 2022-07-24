import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FileManagerComponent} from './file-manager.component';
import {
    CommandsPanelManagerService
} from "../../../warcommands/commands-panel/domain/commands-panel/services/commands-panel-manager.service";
import {
    CommandDragDropManagerService
} from "../../../warcommands/commands-panel/domain/command-drag-drop/services/command-drag-drop-manager.service";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";

describe('FileManagerComponent', () => {
    let component: FileManagerComponent;
    let fixture: ComponentFixture<FileManagerComponent>;

    let commandsPanelManagerServiceSpy;
    let commandDragDropManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        commandsPanelManagerServiceSpy = jasmine.createSpyObj('CommandsPanelManagerService', ['loadOpennedFiles', 'saveFile']);
        commandDragDropManagerServiceSpy = jasmine.createSpyObj('CommandDragDropManagerService', ['createDeleteCommandDropContainer', 'createCancelCommandDragContainer']);
        TestBed.configureTestingModule({
            declarations: [FileManagerComponent],
            imports: [MatIconModule, MatTabsModule],
            providers: [
                {provide: CommandsPanelManagerService, useValue: commandsPanelManagerServiceSpy},
                {provide: CommandDragDropManagerService, useValue: commandDragDropManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
