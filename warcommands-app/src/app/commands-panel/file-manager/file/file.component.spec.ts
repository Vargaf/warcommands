import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FileComponent} from './file.component';
import {
    UxUiNgrxRepositoryService
} from "../../../../warcommands/commands-panel/infrastructure/ngrx/ux-ui/ux-ui-ngrx-repository.service";
import {Renderer2} from "@angular/core";
import {of} from "rxjs";
import {FileDTO} from "../../../../warcommands/commands-panel/domain/file/model/file.dto";

describe('FileComponent', () => {
    let component: FileComponent;
    let fixture: ComponentFixture<FileComponent>;

    let uxUiNgrxRepositoryServiceSpy;
    let rendererSpy;

    beforeEach(waitForAsync(() => {

        rendererSpy = jasmine.createSpyObj('Renderer2', ['setStyle']);
        uxUiNgrxRepositoryServiceSpy = jasmine.createSpyObj('UxUiNgrxRepositoryService', ['watchWindowsSize']);
        const windowSizeMock = {
            height: 0
        }
        uxUiNgrxRepositoryServiceSpy.watchWindowsSize.and.returnValue(of(windowSizeMock));

        TestBed.configureTestingModule({
            declarations: [FileComponent],
            providers: [
                {provide: UxUiNgrxRepositoryService, useValue: uxUiNgrxRepositoryServiceSpy},
                {provide: Renderer2, useValue: rendererSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {

        const fileData: FileDTO = {
            commandContainerId: "",
            id: "",
            name: "",
            playerId: ""
        }

        fixture = TestBed.createComponent(FileComponent);
        component = fixture.componentInstance;
        component.fileData = fileData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
