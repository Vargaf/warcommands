import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WorkerClassMemberOptionListComponent} from './worker-class-member-option-list.component';
import {of} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";

describe('WorkerClassMemberOptionListComponent', () => {
    let component: WorkerClassMemberOptionListComponent;
    let fixture: ComponentFixture<WorkerClassMemberOptionListComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError']);
        const controlsConfigMock = {
            statusChanges: of(null),
            valueChanges: of(null),
            get: () => {
            }
        };
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        TestBed.configureTestingModule({
            declarations: [WorkerClassMemberOptionListComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerClassMemberOptionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
