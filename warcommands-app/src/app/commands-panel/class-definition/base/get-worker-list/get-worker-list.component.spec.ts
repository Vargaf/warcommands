import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GetWorkerListComponent} from './get-worker-list.component';
import {FormBuilder} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {of} from "rxjs";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('GetWorkerListComponent', () => {
    let component: GetWorkerListComponent;
    let fixture: ComponentFixture<GetWorkerListComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = {
            valueChanges: of(null),
            statusChanges: of(null),
            get: () => {}
        }
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError']);
        TestBed.configureTestingModule({
            imports: [MatTooltipModule],
            declarations: [GetWorkerListComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GetWorkerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
