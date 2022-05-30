import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GetWorkerComponent} from './get-worker.component';
import {FormBuilder} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {of} from "rxjs";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('GetWorkerComponent', () => {
    let component: GetWorkerComponent;
    let fixture: ComponentFixture<GetWorkerComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = {
            statusChanges: of(null),
            get: () => {}
        };
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError']);
        TestBed.configureTestingModule({
            imports: [MatTooltipModule],
            declarations: [GetWorkerComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GetWorkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
