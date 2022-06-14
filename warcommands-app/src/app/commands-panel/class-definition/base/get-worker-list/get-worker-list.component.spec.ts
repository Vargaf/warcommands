import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GetWorkerListComponent} from './get-worker-list.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {
    ArrayClassMemberOptionListComponent
} from "../../array/array-class-member-option-list/array-class-member-option-list.component";

describe('GetWorkerListComponent', () => {
    let component: GetWorkerListComponent;
    let fixture: ComponentFixture<GetWorkerListComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = new FormGroup({
            role: new FormControl('', Validators.required),
        });
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError']);
        TestBed.configureTestingModule({
            imports: [MatTooltipModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatIconModule, NoopAnimationsModule],
            declarations: [GetWorkerListComponent, ArrayClassMemberOptionListComponent],
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
