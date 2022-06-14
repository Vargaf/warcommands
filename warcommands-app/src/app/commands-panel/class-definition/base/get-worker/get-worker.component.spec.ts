import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GetWorkerComponent} from './get-worker.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {
    WorkerClassMemberOptionListComponent
} from "../../worker/worker-class-member-option-list/worker-class-member-option-list.component";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('GetWorkerComponent', () => {
    let component: GetWorkerComponent;
    let fixture: ComponentFixture<GetWorkerComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = new FormGroup({
            worker: new FormControl('', Validators.required),
        });
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError']);
        TestBed.configureTestingModule({
            imports: [MatTooltipModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
            declarations: [GetWorkerComponent, WorkerClassMemberOptionListComponent],
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
